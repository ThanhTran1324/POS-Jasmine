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
	let spinnerService: any;
	let router: any;
	let notificationService: any;
	let localesService: any;
	let loggingService: any;
	let afAuth: any;
	let store: MockStore;

	const loginData = {
		email: 'test@test.com',
		password: '111111',
	};
	const responseUserData = {
		user: {
			refreshToken: 'tokenString',
			email: 'test@test.com',
		},
	};
	const initialState: fromAuth.State = {
		isAuthenticated: false,
		userEmail: null,
	};

	beforeEach(() => {
		const spinnerServiceSpy = jasmine.createSpyObj('SpinnerService', [
			'showSpinner',
			'hideSpinner',
		]);
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
		const notificationServiceSpy = jasmine.createSpyObj(
			'NotificationService',
			['showRegularNotification', 'showErrorNotification']
		);
		const localesServiceSpy = jasmine.createSpyObj('LocalesService', [
			'getLocale',
		]);
		const loggingServiceSpy = jasmine.createSpyObj('LogginService', [
			'info',
		]);
		const afAuthSpy = jasmine.createSpyObj('AngularFireAuth', [
			'signInWithEmailAndPassword',
			'createUserWithEmailAndPassword',
			'signOut',
			'sendPasswordResetEmail',
		]);

		TestBed.configureTestingModule({
			imports: [AuthModule],
			providers: [
				AuthService,
				provideMockStore({ initialState }),
				{ provide: Router, useValue: routerSpy },
				{ provide: SpinnerService, useValue: spinnerServiceSpy },
				{
					provide: NotificationService,
					useValue: notificationServiceSpy,
				},
				{ provide: LocalesService, useValue: localesServiceSpy },
				{ provide: LoggingService, useValue: loggingServiceSpy },
				{ provide: AngularFireAuth, useValue: afAuthSpy },
			],
		});
		store = TestBed.inject(MockStore);
		authService = TestBed.inject(AuthService);
		spinnerService = TestBed.inject(SpinnerService);
		router = TestBed.inject(Router);
		notificationService = TestBed.inject(NotificationService);
		localesService = TestBed.inject(LocalesService);
		loggingService = TestBed.inject(LoggingService);
		afAuth = TestBed.inject(AngularFireAuth);
	});

	it('should login Success', fakeAsync(() => {
		afAuth.signInWithEmailAndPassword.and.returnValue(
			Promise.resolve(responseUserData)
		);
		authService.login(loginData);
		flush();
		expect(spinnerService.showSpinner).toHaveBeenCalled();
		expect(spinnerService.hideSpinner).toHaveBeenCalled();
		expect(afAuth.signInWithEmailAndPassword).toHaveBeenCalled();
		expect(notificationService.showRegularNotification).toHaveBeenCalled();

		store.scannedActions$.subscribe((action) => {
			expect(action.type).toBe(Actions.SetAuthenticated.type);
		});
	}));

	it('should loggin Error', fakeAsync(() => {
		afAuth.signInWithEmailAndPassword.and.returnValue(Promise.reject());
		authService.login(loginData);
		flush();
		store.scannedActions$.subscribe((action) => {
			if (action.type === Actions.SetAuthenticated.type) {
				fail();
			}
		});
		expect(spinnerService.showSpinner).toHaveBeenCalled();
		expect(spinnerService.hideSpinner).toHaveBeenCalled();
		expect(notificationService.showErrorNotification).toHaveBeenCalled();
		expect(loggingService.info).toHaveBeenCalled();
	}));

	it('should create new user successfully', fakeAsync(() => {
		afAuth.createUserWithEmailAndPassword.and.returnValue(
			Promise.resolve()
		);
		authService.registerUser(loginData);
		flush();
		expect(spinnerService.showSpinner).toHaveBeenCalled();
		expect(spinnerService.hideSpinner).toHaveBeenCalled();
		expect(loggingService.info).toHaveBeenCalled();
		expect(afAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalled();
		expect(notificationService.showRegularNotification).toHaveBeenCalled();
	}));

	it('should fail to create new user', fakeAsync(() => {
		afAuth.createUserWithEmailAndPassword.and.returnValue(Promise.reject());
		authService.registerUser(loginData);
		flush();
		expect(spinnerService.showSpinner).toHaveBeenCalled();
		expect(spinnerService.hideSpinner).toHaveBeenCalled();
		expect(loggingService.info).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledTimes(0);
		expect(notificationService.showErrorNotification).toHaveBeenCalled();
	}));

	it('should logout', () => {
		authService.logout();
		expect(afAuth.signOut).toHaveBeenCalled();
		store.scannedActions$.subscribe((actions) => {
			expect(actions.type).toBe(Actions.SetUnauthenticated.type);
		});
		expect(router.navigate).toHaveBeenCalled();
		expect(notificationService.showRegularNotification).toHaveBeenCalled();
	});

	it('Should request password reset', fakeAsync(() => {
		afAuth.sendPasswordResetEmail.and.returnValue(Promise.resolve());
		authService.passwordReset('test@test.com');
		flush();
		expect(afAuth.sendPasswordResetEmail).toHaveBeenCalled();
		expect(notificationService.showRegularNotification).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalled();
	}));

	it('Should fail to sent password reset email', fakeAsync(() => {
		afAuth.sendPasswordResetEmail.and.returnValue(Promise.reject());
		authService.passwordReset('test@test.com');
		flush();
		expect(afAuth.sendPasswordResetEmail).toHaveBeenCalled();
		expect(notificationService.showErrorNotification).toHaveBeenCalled();
	}));
});
