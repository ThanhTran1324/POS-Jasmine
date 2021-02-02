import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/authentication/authentication.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { LocalesService } from 'src/app/services/locales.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
	constructor(
		private authService: AuthService,
		private store: Store<fromRoot.State>,
		private localesService: LocalesService,
		private router: Router
	) {}

	getLocale = this.localesService.getLocale;

	userEmail: string;
	authSub: Subscription;
	locales = {
		hello: this.getLocale('navBarLocales', 'hello'),
		routeAway: this.getLocale('navBarLocales', 'adminButton'),
		logoutButton: this.getLocale('navBarLocales', 'logoutButton'),
	};
	time: Date = new Date();
	clockInterval: number;

	ngOnInit() {
		this.authSub = this.store
			.select('auth')
			.pipe(take(1))
			.subscribe((authState) => {
				this.userEmail = authState.userEmail;
			});
		this.getCurrentDate();
	}

	getCurrentDate() {
		this.clockInterval = window.setInterval(() => {
			this.time = new Date(); // set time variable with current date
		}, 1000); // set it every one seconds}
	}

	ngOnDestroy() {
		this.authSub.unsubscribe();
		clearInterval(this.clockInterval);
	}

	onLogout() {
		this.authService.logout();
	}

	routeAway() {
		if (this.router.url === '/home/admin') {
			this.goHome();
			return;
		}
		this.locales.routeAway = this.getLocale('navBarLocales', 'homeButton');
		this.router.navigate(['/home/admin']);
	}

	goHome() {
		this.locales.routeAway = this.getLocale('navBarLocales', 'adminButton');
		this.router.navigate(['/home']);
	}
}
