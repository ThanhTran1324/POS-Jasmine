import { Component, Input } from '@angular/core';
import {
	trigger,
	state,
	style,
	transition,
	animate,
} from '@angular/animations';
import { NotificationData } from './notification.reducer';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	animations: [
		trigger('simpleFadeAnimation', [
			state('void', style({ opacity: 0 })),
			transition(':enter, :leave', [animate(1000)]),
		]),
	],
})
export class NotificationComponent {
	constructor() {}
	@Input() notificationData: NotificationData;
}
