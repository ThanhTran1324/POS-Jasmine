import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { LocalesService } from 'src/app/services/locales.service';
import { AuthModule } from '../authentication.module';
import { AuthService } from '../authentication.service';
import { LoginComponent } from './login.component';
import { click } from '../../../test-ult/test-utils';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let el: DebugElement;
	let localesService: any;
	let authService: any;
	let loginForm: FormGroup;
	let submitButton: DebugElement;

	beforeEach(async(() => {
		const localesServiceSpy = jasmine.createSpyObj('LocalesService', [
			'getLocale',
		]);
		const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
		TestBed.configureTestingModule({
			imports: [AuthModule, AppRoutingModule, NoopAnimationsModule],
			providers: [
				{ provide: LocalesService, useValue: localesServiceSpy },
				{ provide: AuthService, useValue: authServiceSpy },
			],
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(LoginComponent);
				component = fixture.componentInstance;
				component.ngOnInit();
				fixture.detectChanges();

				el = fixture.debugElement;
				submitButton = el.query(By.css('button[type=submit]'));
				loginForm = component.loginForm;
				localesService = TestBed.inject(LocalesService);
				authService = TestBed.inject(AuthService);
			});
	}));

	it('should create Login Component', () => {
		expect(component).toBeTruthy();
	});

	it('should create the login form', () => {
		const email = el.query(By.css('input[id=email]'));
		const password = el.query(By.css('input[id=password]'));
		expect(email).toBeTruthy('Expect email field created.');
		expect(password).toBeTruthy('Expect Password field created.');
	});

	it('should validate input value', () => {
		const email = loginForm.controls.email;
		const password = loginForm.controls.password;

		expect(email.valid).toBe(false);
		email.setValue('Error Email');
		expect(email.valid).toBe(false);

		email.setValue('thanhtran1324@gmail.com');
		expect(email).toBeTruthy();

		expect(password.valid).toBeFalsy();
		password.setValue('123456');
		expect(password.valid).toBeTruthy();
	});

	it('should disable submit button.', () => {
		expect(submitButton.nativeElement.disabled).toBeTruthy(
			'Submit button is NOT disabled'
		);
		loginForm.controls.email.setValue('Unvalid email');
		fixture.detectChanges();
		expect(submitButton.nativeElement.disabled).toBeTruthy(
			'Submit button is NOT disabled'
		);
	});

	it('Should enable submit button', () => {
		loginForm.controls.email.setValue('thanhtran1324@gmail.com');
		loginForm.controls.password.setValue('123456');
		fixture.detectChanges();
		expect(submitButton.nativeElement.disabled).toBeFalsy(
			'Unexpected enable submit button'
		);
	});

	it('Should submit the form', () => {
		loginForm.controls.email.setValue('thanhtran1324@gmail.com');
		loginForm.controls.password.setValue('123456');
		click(submitButton, component.onSubmit());
		expect(authService.login).toHaveBeenCalledTimes(1);
	});

	it('should call localesService', () => {
		expect(localesService.getLocale).toHaveBeenCalled();
	});
});
