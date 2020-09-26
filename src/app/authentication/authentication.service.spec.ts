import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LocalesService } from '../services/locales.service';
import { LoggingService } from '../services/logging.service';
import { NotificationService } from '../shared/notification/notification.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { AuthModule } from './authentication.module';
import { AuthService } from './authentication.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
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
		routerSpy = jasmine.createSpyObj('Router', ['']);
		notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showRegularNotification', 'showErrorNotification']);
		localesServiceSpy = jasmine.createSpyObj('LocalesService', ['']);
		loggingServiceSpy = jasmine.createSpyObj('LogginService', ['info']);
		afAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['signInWithEmailAndPassword']);

		TestBed.configureTestingModule({
			imports: [AuthModule],
			providers: [
				AuthService,
				{ provide: SpinnerService, useValue: spinnerServiceSpy },
				{ provide: Router, useValue: routerSpy },
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
		afAuthSpy.signInWithEmailAndPassword.and.returnValue(Promise.reject({
			error: 'Error'
		}));
		authService.login(loginData);
		flush();
		store.scannedActions$.subscribe((action) => {
			if (action.type === Actions.SET_AUTHENTICATED) {
				fail();
			}
		});
		expect(notificationServiceSpy.showErrorNotification).toHaveBeenCalled();
		expect(loggingServiceSpy.info).toHaveBeenCalled();
		expect(spinnerServiceSpy.showSpinner).toHaveBeenCalled();
		expect(spinnerServiceSpy.hideSpinner).toHaveBeenCalled();
	}));
});
