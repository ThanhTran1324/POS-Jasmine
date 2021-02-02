import { Component, OnInit } from '@angular/core';
import { LocalesService } from '../../services/locales.service';
import { version } from '../../../../package.json';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	constructor(
		private localesService: LocalesService,
		private authService: AuthService
	) {}

	loginForm: FormGroup;
	getLocale = this.localesService.getLocale;
	locales = {
		header: this.getLocale('loginLocales', 'header'),
		subHeader: this.getLocale('loginLocales', 'subHeader'),
		emailTitle: this.getLocale('loginLocales', 'emailTitle'),
		emailPlaceHolder: this.getLocale('loginLocales', 'emailPlaceHolder'),
		passwordTitle: this.getLocale('loginLocales', 'passwordTitle'),
		passwordPlaceHolder: this.getLocale(
			'loginLocales',
			'passwordPlaceHolder'
		),
		createNewAccount: this.getLocale('loginLocales', 'createNewAccount'),
		forgotPassword: this.getLocale('loginLocales', 'forgotPassword'),
		loginButton: this.getLocale('loginLocales', 'loginButton'),
		version: this.getLocale('loginLocales', 'version') + version,
	};

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.loginForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.minLength(6),
			]),
		});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			const email = this.loginForm.get('email').value;
			const password = this.loginForm.get('password').value;
			this.authService.login({ email, password });
			this.loginForm.reset();
		}
	}
}
