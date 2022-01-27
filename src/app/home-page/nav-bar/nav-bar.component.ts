import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/authentication/authentication.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { trigger, state, style, animate, transition,} from '@angular/animations';

import { LocalesService } from 'src/app/services/locales.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.scss'],
	animations: [
		trigger('openClose',[
			state('void', style({
				fontSize: '200px',
				opacity: 0.1,
				color: 'gray'
			})),
			transition(':enter, :leave', [animate(1000)]
			),
		])
	]
})
export class NavBarComponent implements OnInit, OnDestroy {
	constructor(
		private authService: AuthService,
		private store: Store<fromRoot.State>,
		private localesService: LocalesService,
		private router: Router,
		private http: HttpClient
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
		if (this.router.url === '/home/pos/admin') {
			this.goHome();
			return;
		}
		this.locales.routeAway = this.getLocale('navBarLocales', 'homeButton');
		this.router.navigate(['/home/pos/admin']);
	}

	goHome() {
		this.locales.routeAway = this.getLocale('navBarLocales', 'adminButton');
		this.router.navigate(['/home/pos/']);
	}

	test(){
		this.http.get('https://api.covidtracking.com/v1/us/daily.jsons').subscribe(response => {
			console.log(response);
		},error =>{
			console.log(error)
		});
	}
}
