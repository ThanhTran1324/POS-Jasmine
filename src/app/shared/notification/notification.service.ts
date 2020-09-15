import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as NotificationActions from './notification.actions';
import { NotificationType } from './notification.reducer';

@Injectable()
export class NotificationService {
	constructor(
		private store: Store<fromRoot.State>
	) { }

	notificationId = 0;

	showErrorNotification(message: string) {
		this.turnOnNotification('Error', message);
	}

	showRegularNotification(message: string) {
		this.turnOnNotification('Info', message);
	}

	turnOnNotification(type: NotificationType, message: string) {
		const id = this.notificationId++;
		this.store.dispatch(new NotificationActions.AddNotification({ type, message, id }));
		setTimeout(() => {
			this.store.dispatch(new NotificationActions.RemoveNotification({ type, message, id }));
		}, 4000);
	}
}
