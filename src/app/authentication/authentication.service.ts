import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRoot from '../app.reducer';
import * as AuthActions from '../authentication/authentication.actions';
import { environment } from '../../environments/environment';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { LocalesService } from '../services/locales.service';
import { NotificationService } from '../shared/notification/notification.service';
import { LoggingService } from '../services/logging.service';
import { AuthData, ResponseUserData } from '../model/auth-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(
		private afAuth: AngularFireAuth,
		private spinnerService: SpinnerService,
		private store: Store<fromRoot.State>,
		private router: Router,
		private notificationService: NotificationService,
		private localesService: LocalesService,
		private loggingService: LoggingService
	) {}

	getLocale = this.localesService.getLocale;

	login(authData: AuthData) {
		this.spinnerService.showSpinner();
		this.afAuth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then((result: ResponseUserData) => {
				// This logging should be changed - however, leaving it here for current development work
				this.loggingService.info('<<<< Response <<<< ', result);
				this.store.dispatch(
					AuthActions.SetAuthenticated({
						userEmail: result.user.email,
					})
				);
				this.router.navigate(['/home']);
				this.notificationService.showRegularNotification(
					this.getLocale('authentication', 'loginSuccess')
				);
			})
			.catch((error) => {
				this.loggingService.info('<<<< Response <<<< ', error);
				this.notificationService.showErrorNotification(
					this.getLocale('authentication', 'loginError')
				);
			})
			.finally(() => {
				this.spinnerService.hideSpinner();
			});
	}

	registerUser(authData: AuthData) {
		this.spinnerService.showSpinner();
		this.afAuth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then((result) => {
				this.loggingService.info('<<<< Response <<<< ', result);
				this.router.navigate(['/']);
				this.notificationService.showRegularNotification(
					this.getLocale('authentication', 'signupSuccess')
				);
			})
			.catch((error) => {
				this.loggingService.info('<<<< Response <<<< ', error);
				this.notificationService.showErrorNotification(
					this.getLocale('authentication', 'signupError')
				);
			})
			.finally(() => {
				this.spinnerService.hideSpinner();
			});
	}

	logout(logoutSection: string = 'logoutSuccess') {
		localStorage.removeItem('userToken');
		this.afAuth.signOut();
		this.store.dispatch(AuthActions.SetUnauthenticated());
		this.router.navigate(['/']);
		this.notificationService.showRegularNotification(
			this.getLocale('authentication', logoutSection)
		);
	}

	passwordReset(email: string) {
		this.spinnerService.showSpinner();
		const actionCodeSettings = {
			url: environment.loginUrl,
			handleCodeInApp: false,
		};
		this.afAuth
			.sendPasswordResetEmail(email, actionCodeSettings)
			.then((result) => {
				this.loggingService.info('<<<< Response <<<< ', result);
				this.notificationService.showRegularNotification(
					this.getLocale(
						'authentication',
						'passwordResetSubmitSuccess'
					)
				);
				this.router.navigate(['/']);
			})
			.catch((error) => {
				this.loggingService.info('<<<< Response <<<< ', error);
				this.notificationService.showErrorNotification(
					this.getLocale('authentication', 'passwordResetSubmitError')
				);
			})
			.finally(() => {
				this.spinnerService.hideSpinner();
			});
	}
}
