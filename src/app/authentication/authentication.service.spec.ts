import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { LocalesService } from '../services/locales.service';
import { LoggingService } from '../services/logging.service';
import { NotificationService } from '../shared/notification/notification.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { AuthModule } from './authentication.module';
import { AuthService } from './authentication.service';
import * as fromAuth from './authentication.reducer';
import * as Actions from './authentication.actions';

describe('Auth Service Testing', () => {
	let authService: AuthService;
	let spinnerServiceSpy: any;
	let routerSpy: any;
	let notificationServiceSpy: any;
	let localesServiceSpy: any;
	let loggingServiceSpy: any;
	let afAuthSpy: any;
	let store: MockStore;

	const loginData = {
		email: 'test@test.com',
		password: '111111'
	};
	const responseUserData = {
		user: {
			refreshToken: 'tokenString',
			email: 'test@test.com'
		}
	};
	const initialState: fromAuth.State = { isAuthenticated: false, userEmail: null };

	beforeEach(() => {
		spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', ['showSpinner', 'hideSpinner']);
		routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showRegularNotification', 'showErrorNotification']);
		localesServiceSpy = jasmine.createSpyObj('LocalesService', ['getLocale']);
		loggingServiceSpy = jasmine.createSpyObj('LogginService', ['info']);
		afAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['signInWithEmailAndPassword', 'createUserWithEmailAndPassword', 'signOut', 'sendPasswordResetEmail']);

		TestBed.configureTestingModule({
			imports: [AuthModule],
			providers: [
				AuthService,
				{ provide: Router, useValue: routerSpy },
				{ provide: SpinnerService, useValue: spinnerServiceSpy },
				{ provide: NotificationService, useValue: notificationServiceSpy },
				{ provide: LocalesService, useValue: localesServiceSpy },
				{ provide: LoggingService, useValue: loggingServiceSpy },
				{ provide: AngularFireAuth, useValue: afAuthSpy },
				provideMockStore({ initialState }),
			]
		});
		store = TestBed.inject(MockStore);
		authService = TestBed.inject(AuthService);
	});

	fit('should login Success', fakeAsync(() => {
		afAuthSpy.signInWithEmailAndPassword.and.returnValue(Promise.resolve(responseUserData));
		authService.login(loginData);
		flush();
		expect(spinnerServiceSpy.showSpinner).toHaveBeenCalled();
		expect(spinnerServiceSpy.hideSpinner).toHaveBeenCalled();
		expect(afAuthSpy.signInWithEmailAndPassword).toHaveBeenCalled();
		expect(notificationServiceSpy.showRegularNotification).toHaveBeenCalled();

		store.scannedActions$.subscribe((action) => {
			expect(action.type).toBe(Actions.SET_AUTHENTICATED);
		});
	}));

	fit('should loggin Error', fakeAsync(() => {
		afAuthSpy.signInWithEmailAndPassword.and.returnValue(Promise.reject());
		authService.login(loginData);
		flush();
		store.scannedActions$.subscribe((action) => {
			if (action.type === Actions.SET_AUTHENTICATED) {
				fail();
			}
		});
		expect(spinnerServiceSpy.showSpinner).toHaveBeenCalled();
		expect(spinnerServiceSpy.hideSpinner).toHaveBeenCalled();
		expect(notificationServiceSpy.showErrorNotification).toHaveBeenCalled();
		expect(loggingServiceSpy.info).toHaveBeenCalled();
	}));

	fit('should create new user successfully', fakeAsync(() => {
		afAuthSpy.createUserWithEmailAndPassword.and.returnValue(Promise.resolve());
		authService.registerUser(loginData);
		flush();
		expect(spinnerServiceSpy.showSpinner).toHaveBeenCalled();
		expect(spinnerServiceSpy.hideSpinner).toHaveBeenCalled();
		expect(loggingServiceSpy.info).toHaveBeenCalled();
		expect(afAuthSpy.createUserWithEmailAndPassword).toHaveBeenCalled();
		expect(routerSpy.navigate).toHaveBeenCalled();
		expect(notificationServiceSpy.showRegularNotification).toHaveBeenCalled();
	}));

	fit('should fail to create new user', fakeAsync(() => {
		afAuthSpy.createUserWithEmailAndPassword.and.returnValue(Promise.reject());
		authService.registerUser(loginData);
		flush();
		expect(spinnerServiceSpy.showSpinner).toHaveBeenCalled();
		expect(spinnerServiceSpy.hideSpinner).toHaveBeenCalled();
		expect(loggingServiceSpy.info).toHaveBeenCalled();
		expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
		expect(notificationServiceSpy.showErrorNotification).toHaveBeenCalled();
	}));

	fit('should logout', () => {
		authService.logout();
		expect(afAuthSpy.signOut).toHaveBeenCalled();
		store.scannedActions$.subscribe(actions => {
			expect(actions.type).toBe(Actions.SET_UNAUTHENTICATED);
		});
		expect(routerSpy.navigate).toHaveBeenCalled();
		expect(notificationServiceSpy.showRegularNotification).toHaveBeenCalled();
	});

	fit('Should request password reset', fakeAsync(() => {
		afAuthSpy.sendPasswordResetEmail.and.returnValue(Promise.resolve());
		authService.passwordReset('test@test.com');
		flush();
		expect(afAuthSpy.sendPasswordResetEmail).toHaveBeenCalled();
		expect(notificationServiceSpy.showRegularNotification).toHaveBeenCalled();
		expect(routerSpy.navigate).toHaveBeenCalled();
	}));

	fit('Should fail to sent password reset email', fakeAsync(() => {
		afAuthSpy.sendPasswordResetEmail.and.returnValue(Promise.reject());
		authService.passwordReset('test@test.com');
		flush();
		expect(afAuthSpy.sendPasswordResetEmail).toHaveBeenCalled();
		expect(notificationServiceSpy.showErrorNotification).toHaveBeenCalled();
	}));
});
