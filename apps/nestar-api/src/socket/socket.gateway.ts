import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from 'ws';
interface MessagePayload {
	event: string;
	text: string;
}

interface InfoPayload {
	event: string;
	totalClients: number;
}
@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
	private logger: Logger = new Logger('SocketEventsGateway');
	private summuryClient: number = 0;

	@WebSocketServer()
	server: Server;

	afterInit(server: Server) {
		this.logger.verbose(`WebSocket Server Initialized & total: [${this.summuryClient}] `);
	}

	handleConnection(client: WebSocket, ...args: any[]) {
		this.summuryClient++;
		this.logger.verbose(`Connection & total: [${this.summuryClient}]`);
		const infoMsg: InfoPayload = {
			event: 'Info',
			totalClients: this.summuryClient,
		};
		this.emitMessage(infoMsg);
	}

	handleDisconnect(client: WebSocket) {
		this.summuryClient--;
		this.logger.verbose(`DisConnection & total: [${this.summuryClient}]`);
		const infoMsg: InfoPayload = {
			event: 'Info',
			totalClients: this.summuryClient,
		};

		this.broadcastMessage(client, infoMsg);
	}

	@SubscribeMessage('message')
	public async asynchandleMessage(client: any, payload: any): Promise<void> {
		const newMessage: MessagePayload = { event: 'message', text: payload };

		this.logger.verbose(`NEW Message: ${payload}`);
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
