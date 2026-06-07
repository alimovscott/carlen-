import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Direction, Message } from '../../libs/enums/common.enum';
import { NotificationGroup, NotificationStatus, NotificationType } from '../../libs/enums/notification.enum';
import { Notification, Notifications } from '../../libs/dto/notification/notification';
import { NotificationsInquiry } from '../../libs/dto/notification/notification.input';
import { T } from '../../libs/types/common';

interface NotificationCreateInput {
	notificationType: NotificationType;
	notificationGroup: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	authorId: ObjectId;
	receiverId: ObjectId;
	productId?: ObjectId;
	articleId?: ObjectId;
}

@Injectable()
export class NotificationService {
	constructor(@InjectModel('Notification') private readonly notificationModel: Model<Notification>) {}

	public async getNotifications(memberId: ObjectId, input: NotificationsInquiry): Promise<Notifications> {
		const match: T = {
			receiverId: memberId,
			notificationStatus: { $ne: NotificationStatus.DELETE },
		};
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		this.shapeMatchQuery(match, input);

		const result = await this.notificationModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							{
								$lookup: {
									from: 'members',
									localField: 'authorId',
									foreignField: '_id',
									as: 'memberData',
								},
							},
							{ $unwind: { path: '$memberData', preserveNullAndEmptyArrays: true } },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();

		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result[0];
	}

	private shapeMatchQuery(match: T, input: NotificationsInquiry): void {
		const { notificationStatus, notificationType, notificationGroup } = input.search ?? {};

		if (notificationStatus && notificationStatus !== NotificationStatus.DELETE) match.notificationStatus = notificationStatus;
		if (notificationType) match.notificationType = notificationType;
		if (notificationGroup) match.notificationGroup = notificationGroup;
	}

	public async getUnreadNotificationsCount(memberId: ObjectId): Promise<number> {
		return await this.notificationModel
			.countDocuments({
				receiverId: memberId,
				notificationStatus: NotificationStatus.WAIT,
			})
			.exec();
	}

	public async markNotificationAsRead(memberId: ObjectId, notificationId: ObjectId): Promise<Notification> {
		await this.assertNotificationOwner(memberId, notificationId);

		const result = await this.notificationModel
			.findOneAndUpdate(
				{
					_id: notificationId,
					receiverId: memberId,
					notificationStatus: { $ne: NotificationStatus.DELETE },
				},
				{ notificationStatus: NotificationStatus.READ },
				{ new: true },
			)
			.exec();

		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);
		return result;
	}

	public async markAllNotificationsAsRead(memberId: ObjectId): Promise<number> {
		const result = await this.notificationModel
			.updateMany(
				{
					receiverId: memberId,
					notificationStatus: NotificationStatus.WAIT,
				},
				{ notificationStatus: NotificationStatus.READ },
			)
			.exec();

		return result.modifiedCount;
	}

	public async removeNotification(memberId: ObjectId, notificationId: ObjectId): Promise<Notification> {
		await this.assertNotificationOwner(memberId, notificationId);

		const result = await this.notificationModel
			.findOneAndUpdate(
				{
					_id: notificationId,
					receiverId: memberId,
					notificationStatus: { $ne: NotificationStatus.DELETE },
				},
				{ notificationStatus: NotificationStatus.DELETE },
				{ new: true },
			)
			.exec();

		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}

	public async notifyFollow(authorId: ObjectId, receiverId: ObjectId): Promise<Notification | null> {
		return await this.createNotification({
			authorId,
			receiverId,
			notificationType: NotificationType.FOLLOW,
			notificationGroup: NotificationGroup.MEMBER,
			notificationTitle: 'New follower',
			notificationDesc: 'started following you',
		});
	}

	public async notifyLike(
		authorId: ObjectId,
		receiverId: ObjectId,
		notificationGroup: NotificationGroup,
		refId: ObjectId,
	): Promise<Notification | null> {
		return await this.createNotification({
			authorId,
			receiverId,
			notificationType: NotificationType.LIKE,
			notificationGroup,
			notificationTitle: 'New like',
			notificationDesc: 'liked your content',
			...this.shapeReference(notificationGroup, refId),
		});
	}

	public async notifyComment(
		authorId: ObjectId,
		receiverId: ObjectId,
		notificationGroup: NotificationGroup,
		refId: ObjectId,
	): Promise<Notification | null> {
		return await this.createNotification({
			authorId,
			receiverId,
			notificationType: NotificationType.COMMENT,
			notificationGroup,
			notificationTitle: 'New comment',
			notificationDesc: 'commented on your content',
			...this.shapeReference(notificationGroup, refId),
		});
	}

	public async notifyView(
		authorId: ObjectId,
		receiverId: ObjectId,
		notificationGroup: NotificationGroup,
		refId: ObjectId,
	): Promise<Notification | null> {
		return await this.createNotification({
			authorId,
			receiverId,
			notificationType: NotificationType.VIEW,
			notificationGroup,
			notificationTitle: 'New view',
			notificationDesc: 'viewed your content',
			...this.shapeReference(notificationGroup, refId),
		});
	}

	private shapeReference(notificationGroup: NotificationGroup, refId: ObjectId): Pick<NotificationCreateInput, 'productId' | 'articleId'> {
		if (notificationGroup === NotificationGroup.PRODUCT) return { productId: refId };
		if (notificationGroup === NotificationGroup.ARTICLE) return { articleId: refId };
		return {};
	}

	private async createNotification(input: NotificationCreateInput): Promise<Notification | null> {
		if (input.authorId.toString() === input.receiverId.toString()) return null;

		try {
			const result = await this.notificationModel.create(input);
			await this.emitNotificationToReceiver(input.receiverId, result);
			return result;
		} catch (err) {
			console.log('Error, NotificationService.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

	private async emitNotificationToReceiver(receiverId: ObjectId, notification: Notification): Promise<void> {
		// TODO: integrate SocketGateway later.
		void receiverId;
		void notification;
	}

	private async assertNotificationOwner(memberId: ObjectId, notificationId: ObjectId): Promise<void> {
		const notification = await this.notificationModel.findById(notificationId).exec();
		if (!notification) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		if (notification.receiverId.toString() !== memberId.toString()) throw new ForbiddenException(Message.NOT_ALLOWED_REQUEST);
	}
}
