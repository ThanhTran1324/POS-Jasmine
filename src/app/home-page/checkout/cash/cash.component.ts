import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalesService } from '../../../services/locales.service';
import { ModalService } from '../../../shared/modal/modal.service';

@Component({
	selector: 'app-cash',
	templateUrl: './cash.component.html',
	styleUrls: ['./cash.component.scss'],
})
export class CashComponent implements OnInit {
	constructor(
		private localesService: LocalesService,
		private modalService: ModalService
	) {}

	@Input() totalCost: number;
	@Output() submitPayment = new EventEmitter();
	cashForm: FormGroup;
	change: number;
	isFormSubmitted: boolean;
	getLocale = this.localesService.getLocale;
	locales = {
		total: this.getLocale('cashLocales', 'total'),
		amountTenderedTitle: this.getLocale(
			'cashLocales',
			'amountTenderedTitle'
		),
		amountTenderedPlaceHolder: this.getLocale(
			'cashLocales',
			'amountTenderedPlaceHolder'
		),
		amountTenderedError: this.getLocale(
			'cashLocales',
			'amountTenderedError'
		),
		cancelButton: this.getLocale('cashLocales', 'cancelButton'),
		calcButton: this.getLocale('cashLocales', 'calcButton'),
		changeAmount: this.getLocale('cashLocales', 'changeAmount'),
		submitButton: this.getLocale('cashLocales', 'submitButton'),
	};

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.cashForm = new FormGroup({
			tenderedAmount: new FormControl(null, [Validators.required]),
		});
	}

	closeModal() {
		this.modalService.closeModal();
	}

	calcChangeAmount() {
		if (this.cashForm.get('tenderedAmount').value < this.totalCost) {
			this.cashForm
				.get('tenderedAmount')
				.setErrors({ notEnoughMoney: true });
		} else {
			this.change =
				this.cashForm.get('tenderedAmount').value - this.totalCost;
			this.isFormSubmitted = true;
		}
	}

	onSubmitPayment() {
		this.submitPayment.emit();
		this.modalService.closeModal();
	}
}
