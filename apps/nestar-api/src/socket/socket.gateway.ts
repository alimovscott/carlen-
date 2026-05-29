import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from 'ws';
import { AuthService } from '../components/auth/auth.service';
import { Member } from '../libs/dto/member/member';
import * as url from 'url';
interface MessagePayload {
	event: string;
	text: string;
	memberData: Member;
}

interface InfoPayload {
	event: string;
	totalClients: number;
	memberData: Member;
	action: string;
}
@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
	private logger: Logger = new Logger('SocketEventsGateway');
	private summuryClient: number = 0;
	private clientsAuthMap = new Map<WebSocket, Member>();
	private messagesList: MessagePayload[] = [];

	constructor(private authService: AuthService) {}

	@WebSocketServer()
	server: Server;

	afterInit(server: Server) {
		this.logger.verbose(`WebSocket Server Initialized & total: [${this.summuryClient}] `);
	}

	private async retrieveAuth(req: any): Promise<Member> {
		try {
			const parsedUrl = url.parse(req.url, true);
			const { token } = parsedUrl.query;

			return await this.authService.verifyToken(token as string);
		} catch (err) {
			return null;
		}
	}

	public async handleConnection(client: WebSocket, req: any) {
		const authMember = await this.retrieveAuth(req);
		this.summuryClient++;
		this.clientsAuthMap.set(client, authMember);

		const clientNick: string = authMember?.memberNick ?? 'Guest';
		this.logger.verbose(`Connection [${clientNick}] & total: [${this.summuryClient}]`);
		const infoMsg: InfoPayload = {
			event: 'Info',
			totalClients: this.summuryClient,
			memberData: authMember,
			action: 'joined',
		};
		this.emitMessage(infoMsg);
		// CLINT
		client.send(JSON.stringify({ event: 'getMessages', list: this.messagesList }));
	}

	public handleDisconnect(client: WebSocket) {
		const authMember = this.clientsAuthMap.get(client);
		this.summuryClient--;

		this.clientsAuthMap.delete(client);
		const clientNick: string = authMember?.memberNick ?? 'Guest';
		this.logger.verbose(`DisConnection [${clientNick}] & total: [${this.summuryClient}]`);
		const infoMsg: InfoPayload = {
			event: 'Info',
			totalClients: this.summuryClient,
			memberData: authMember,
			action: 'left',
		};

		this.broadcastMessage(client, infoMsg);
	}

	@SubscribeMessage('message')
	public async handleMessage(client: WebSocket, payload: string): Promise<void> {
		const authMember = this.clientsAuthMap.get(client);
		const newMessage: MessagePayload = { event: 'message', text: payload, memberData: authMember };

		const clientNick: string = authMember?.memberNick ?? 'Guest';
		this.logger.verbose(`NEW Message [${clientNick}]: ${payload}`);
		this.messagesList.push(newMessage);
		if (this.messagesList.length >= 5) this.messagesList.splice(0, this.messagesList.length - 5);

		this.emitMessage(newMessage);
	}

	private broadcastMessage(sender: WebSocket, message: InfoPayload | MessagePayload) {
		this.server.clients.forEach((client) => {
			if (client !== sender && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	}

	private emitMessage(message: InfoPayload | MessagePayload) {
		this.server.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
	}
}
