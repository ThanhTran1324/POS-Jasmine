import { Action } from '@ngrx/store';
import { NotificationData } from './notification.reducer';

export const ADD_NOTIFICATION = '[UI] Add Notification';
export const REMOVE_NOTIFICATION = '[UI] Remove Notification';

export class AddNotification implements Action {
	readonly type = ADD_NOTIFICATION;

	constructor(public payload: NotificationData) { }
}

export class RemoveNotification implements Action {
	readonly type = REMOVE_NOTIFICATION;
	constructor(public payload: NotificationData) { }
}

export type NotificationActions = AddNotification | RemoveNotification;
