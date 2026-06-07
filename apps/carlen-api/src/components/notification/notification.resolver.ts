import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { Notification, Notifications } from '../../libs/dto/notification/notification';
import { NotificationsInquiry } from '../../libs/dto/notification/notification.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NotificationService } from './notification.service';

@Resolver()
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}

	@UseGuards(AuthGuard)
	@Query(() => Notifications)
	public async getNotifications(
		@Args('input') input: NotificationsInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notifications> {
		console.log('Query: getNotifications');
		return await this.notificationService.getNotifications(memberId, input);
	}

	@UseGuards(AuthGuard)
	@Query(() => Int)
	public async getUnreadNotificationsCount(@AuthMember('_id') memberId: ObjectId): Promise<number> {
		console.log('Query: getUnreadNotificationsCount');
		return await this.notificationService.getUnreadNotificationsCount(memberId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	public async markNotificationAsRead(
		@Args('notificationId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notification> {
		console.log('Mutation: markNotificationAsRead');
		const notificationId = shapeIntoMongoObjectId(input);
		return await this.notificationService.markNotificationAsRead(memberId, notificationId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Int)
	public async markAllNotificationsAsRead(@AuthMember('_id') memberId: ObjectId): Promise<number> {
		console.log('Mutation: markAllNotificationsAsRead');
		return await this.notificationService.markAllNotificationsAsRead(memberId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	public async removeNotification(
		@Args('notificationId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notification> {
		console.log('Mutation: removeNotification');
		const notificationId = shapeIntoMongoObjectId(input);
		return await this.notificationService.removeNotification(memberId, notificationId);
	}
}
