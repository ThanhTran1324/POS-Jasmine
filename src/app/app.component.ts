import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';
import { NotificationData } from './shared/notification/notification.reducer';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
	constructor(
		private store: Store,
		private changeDetector: ChangeDetectorRef
	) {}

	showSpinner$: Observable<boolean> = this.store.select(fromRoot.showSpinner);
	notifications$: Observable<NotificationData[]> = this.store.select(
		fromRoot.showNotification
	);

	ngAfterViewChecked() {
		this.changeDetector.detectChanges();
	}

	trackNotificationById(notification: NotificationData) {
		return notification.id;
	}
}
