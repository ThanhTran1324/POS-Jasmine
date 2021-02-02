import {
	NotificationActions,
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION,
} from './notification.actions';

export type NotificationType = 'Error' | 'Info';
export interface NotificationData {
	message: string;
	type: NotificationType;
	id: number;
}

const initialState: NotificationData[] = [];

export function notificationReducer(
	state = initialState,
	action: NotificationActions
) {
	switch (action.type) {
		case ADD_NOTIFICATION:
			return [...state, action.payload];
		case REMOVE_NOTIFICATION:
			state = state.reduce((acc, notification) => {
				if (notification.id !== action.payload.id) {
					acc.push(notification);
				}
				return acc;
			}, []);
			return state;
		default: {
			return state;
		}
	}
}

export const showNotification = (state: NotificationData[]) => state;
