import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { LocalesService } from 'src/app/services/locales.service';
import { AuthService } from '../authentication.service';
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	constructor(
		private localesService: LocalesService,
		private authService: AuthService
	) {}

	signupForm: FormGroup;
	getLocale = this.localesService.getLocale;
	locales = {
		header: this.getLocale('signupLocales', 'header'),
		subHeader: this.getLocale('signupLocales', 'subHeader'),
		emailTitle: this.getLocale('signupLocales', 'emailTitle'),
		emailPlaceHolder: this.getLocale('signupLocales', 'emailPlaceHolder'),
		emailError: this.getLocale('signupLocales', 'emailError'),
		passwordTitle: this.getLocale('signupLocales', 'passwordTitle'),
		passwordPlaceHolder: this.getLocale(
			'signupLocales',
			'passwordPlaceHolder'
		),
		passwordError: this.getLocale('signupLocales', 'passwordError'),
		passwordConfirmTitle: this.getLocale(
			'signupLocales',
			'passwordConfirmTitle'
		),
		passwordConfirmPlaceHolder: this.getLocale(
			'signupLocales',
			'passwordConfirmPlaceHolder'
		),
		passwordConfirmError: this.getLocale(
			'signupLocales',
			'passwordConfirmError'
		),
		backButton: this.getLocale('signupLocales', 'backButton'),
		signupButton: this.getLocale('signupLocales', 'signupButton'),
	};

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.signupForm = new FormGroup(
			{
				email: new FormControl(null, [
					Validators.required,
					Validators.email,
				]),
				password: new FormControl(null, [
					Validators.required,
					Validators.minLength(6),
				]),
				passwordConfirm: new FormControl(null, [
					Validators.required,
					Validators.minLength(6),
				]),
			},
			[this.checkPasswords.bind(this)]
		);
	}

	checkPasswords(signupForm: FormGroup) {
		const pass: string = signupForm.get('password').value;
		const passConfirm: string = signupForm.get('passwordConfirm').value;
		if (pass !== passConfirm) {
			this.signupForm
				.get('passwordConfirm')
				.setErrors({ NoPassswordMatch: true });
		}
	}

	onSubmit() {
		if (this.signupForm.valid) {
			const email = this.signupForm.get('email').value;
			const password = this.signupForm.get('password').value;
			this.authService.registerUser({ email, password });
			this.signupForm.reset();
		}
	}
}
