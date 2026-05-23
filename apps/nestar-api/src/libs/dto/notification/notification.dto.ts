import { InputType, ObjectType, Field, Int } from '@nestjs/graphql';
import {
	NotificationType,
	NotificationStatus,
	NotificationGroup,
} from '../../enums/notification.enum';

/**
 * Create Notification Input DTO
 */
@InputType()
export class NotificationInput {
	@Field(() => NotificationType)
	notificationType: NotificationType;

	@Field(() => NotificationGroup)
	notificationGroup: NotificationGroup;

	@Field()
	notificationTitle: string;

	@Field({ nullable: true })
	notificationDesc?: string;

	@Field()
	receiverId: string;

	@Field({ nullable: true })
	propertyId?: string;

	@Field({ nullable: true })
	articleId?: string;
}

/**
 * Notifications Filter Input DTO
 */
@InputType()
export class NotificationsFilter {
	@Field(() => NotificationStatus, { nullable: true })
	status?: NotificationStatus;

	@Field(() => NotificationType, { nullable: true })
	type?: NotificationType;

	@Field(() => Int, { nullable: true, defaultValue: 1 })
	page?: number;

	@Field(() => Int, { nullable: true, defaultValue: 20 })
	limit?: number;
}

/**
 * Notification Object Type (GraphQL)
 */
@ObjectType()
export class NotificationObject {
	@Field()
	_id: string;

	@Field(() => NotificationType)
	notificationType: NotificationType;

	@Field(() => NotificationStatus)
	notificationStatus: NotificationStatus;

	@Field(() => NotificationGroup)
	notificationGroup: NotificationGroup;

	@Field()
	notificationTitle: string;

	@Field({ nullable: true })
	notificationDesc?: string;

	@Field()
	authorId: string;

	@Field()
	receiverId: string;

	@Field({ nullable: true })
	propertyId?: string;

	@Field({ nullable: true })
	articleId?: string;

	@Field(() => String)
	createdAt: string;

	@Field(() => String)
	updatedAt: string;
}

/**
 * Notifications Response DTO
 */
@ObjectType()
export class NotificationsResponse {
	@Field(() => [NotificationObject])
	notifications: NotificationObject[];

	@Field(() => Int)
	total: number;

	@Field(() => Int)
	page: number;

	@Field(() => Int)
	limit: number;
}

/**
 * Single Notification Response DTO
 */
@ObjectType()
export class NotificationDetailResponse {
	@Field()
	ok: boolean;

	@Field(() => NotificationObject, { nullable: true })
	notification?: NotificationObject;

	@Field({ nullable: true })
	error?: string;
}

/**
 * Notification Statistics DTO
 */
@ObjectType()
export class NotificationStats {
	@Field(() => Int)
	unreadCount: number;

	@Field(() => Int)
	totalCount: number;

	@Field(() => Int)
	readCount: number;
}
