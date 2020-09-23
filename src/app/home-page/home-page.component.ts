import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../authentication/authentication.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	constructor(private authService: AuthService) { }

	idleTime: number;

	ngOnInit(): void {
		this.resetTimer();
	}

	/**
	 * Set idle timeout to 10 minutes
	 * Listen to interaction on the DOM - when there is interaction, clear timeout
	 * Otherwise, log user out
	 */
	@HostListener('document:mousemove')
	@HostListener('document:keypress')
	@HostListener('document:click')
	@HostListener('document:wheel')
	resetTimer() {
		clearTimeout(this.idleTime);
		this.idleTime = window.setTimeout(() => {
			this.authService.logout('timeoutLogout');
		}, 600000);
	}
}
