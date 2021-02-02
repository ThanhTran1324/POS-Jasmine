import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalesService } from 'src/app/services/locales.service';
import { AuthService } from '../authentication.service';

@Component({
	selector: 'app-password-reset',
	templateUrl: './password-reset.component.html',
	styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
	constructor(
		private localesService: LocalesService,
		private authService: AuthService
	) {}

	passwordResetForm: FormGroup;
	getLocale = this.localesService.getLocale;
	locales = {
		header: this.getLocale('passwordResetLocales', 'header'),
		subHeader: this.getLocale('passwordResetLocales', 'subHeader'),
		emailTitle: this.getLocale('passwordResetLocales', 'emailTitle'),
		emailPlaceHolder: this.getLocale(
			'passwordResetLocales',
			'emailPlaceHolder'
		),
		backButton: this.getLocale('passwordResetLocales', 'backButton'),
		submitButton: this.getLocale('passwordResetLocales', 'submitButton'),
	};

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.passwordResetForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.email,
			]),
		});
	}

	onSubmit() {
		if (this.passwordResetForm.valid) {
			const email = this.passwordResetForm.get('email').value;
			this.authService.passwordReset(email);
		}
	}
}
