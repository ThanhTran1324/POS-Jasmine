import { Injectable } from '@angular/core';

const locales: object = {
	errorLocales: {
		localeNotFound: '<<Sorry, this locale is missing>>',
	},
	spinnerLocales: {
		loading: 'Loading...'
	},
	mobileViewLocales: {
		notice: 'Mobile and Tablet are not supported - Please try again in Desktop mode (960px and up).'
	},
	loginLocales: {
		header: 'Point of Sale System',
		subHeader: 'Checking out has never been that easy!',
		emailTitle: 'Email',
		emailPlaceHolder: 'youremail@mail.com',
		passwordTitle: 'Password',
		passwordPlaceHolder: 'Password',
		createNewAccount: 'Create a new account',
		forgotPassword: 'Forgot your password?',
		loginButton: 'Login',
		version: 'Version: ',
	},
	signupLocales: {
		header: 'Point of Sale System',
		subHeader: 'Sign Up',
		emailTitle: 'Email',
		emailPlaceHolder: 'youremail@mail.com',
		emailError: 'Email not valid',
		passwordTitle: 'Password',
		passwordPlaceHolder: 'Minimum 6 characters',
		passwordError: 'Minimum 6 characters.',
		passwordConfirmTitle: 'Re-enter password',
		passwordConfirmPlaceHolder: 'Re-enter password',
		passwordConfirmError: 'Please enter the same password again.',
		backButton: 'Back',
		signupButton: 'Signup',
	},
	authentication: {
		loginSuccess: 'Log in successfully',
		loginError: 'Unable to login, please try again',
		signupSuccess: 'Account was successfully created',
		signupError: 'Unable to create account, please try again',
		passwordResetSubmitSuccess: 'Your password reset email has been sent',
		passwordResetSubmitError: 'Unable to send reset email',
		logoutSuccess: 'Log out successfully',
		timeoutLogout: 'User is logged out due to inactivity'
	},
	passwordResetLocales: {
		header: 'Point of Sale System',
		subHeader: 'Password Reset',
		emailTitle: 'Email',
		emailPlaceHolder: 'youremail@mail.com',
		backButton: 'Back',
		submitButton: 'Submit'
	},
	pageNotFound: {
		title: '404',
		subTitle: 'PAGE NOT FOUND',
		description: 'Redirect to login page in @@value seconds',
		backButton: 'Back'
	},
	navBarLocales: {
		hello: 'Hello ',
		adminButton: 'Admin',
		homeButton: 'Home',
		logoutButton: 'Logout'
	},
	menuCreatorLocales: {
		name: 'Name',
		namePlaceholder: 'Cheese Burder, Pizza',
		price: 'Price',
		pricePlaceholder: '$1.00',
		dropMenuEdit: 'Edit',
		dropMenuDelete: 'Delete',
		submitButton: 'Submit',
		addItemButton: 'Add Item',
		itemFormHeader: 'Menu Item',
		groupFormHeader: 'Menu Group',
	},
	menuServiceLocales: {
		menuUpdateSuccess: 'Menu was successfully updated.',
		deleteSuccess: 'Delete Successful.',
		error: 'ERROR occurred!	',
	},
	cartLocales: {
		itemHeader: 'Item',
		qtyHeader: 'Quantity',
		priceHeader: 'Price',
	},
	checkOutLocales: {
		subTotal: 'Subtotal : ',
		tax: 'Estimated tax: ',
		total: 'Total : ',
		cashButton: 'Cash',
		discountButton: 'Discount',
		creditCardButton: 'Credit Card',
		settingButton: 'Setting'
	},
	cashLocales: {
		total: 'Total : ',
		amountTenderedTitle: 'Amount Tendered: ',
		amountTenderedPlaceHolder: '$1.00',
		amountTenderedError: 'Payment is not Enough!',
		cancelButton: 'Cancel',
		calcButton: 'Calc',
		changeAmount: 'Change Amount: ',
		submitButton: 'Submit Payment',
		submitSuccess: 'Order Submitted.',
		submitError: 'ERROR occurred!'
	},
};

@Injectable()
export class LocalesService {
	constructor() { }

	getLocale(section: string, target: string) {
		const errorSection = 'errorLocales';

		if (locales[section] && locales[section][target]) {
			return locales[section][target];
		}
		return locales[errorSection].localeNotFound;
	}
}
