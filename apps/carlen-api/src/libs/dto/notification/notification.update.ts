import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
import { NotificationStatus } from '../../enums/notification.enum';

@InputType()
export class NotificationUpdate {
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => NotificationStatus, { nullable: true })
	notificationStatus?: NotificationStatus;
}
