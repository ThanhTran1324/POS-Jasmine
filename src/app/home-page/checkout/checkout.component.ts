import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import * as SelectedItemsActions from '../selected-items.actions';
import { LocalesService } from '../../services/locales.service';
import { ModalService } from '../../shared/modal/modal.service';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
	constructor(
		private store: Store<fromRoot.State>,
		private localesService: LocalesService,
		private modalService: ModalService
	) { }

	@ViewChild('cashCheckoutComponent', { static: true }) cashCheckoutComponent: ElementRef;
	subTotal: number;
	tax: number;
	totalCost: number;
	selectedItemsSub: Subscription;
	getLocale = this.localesService.getLocale;
	locales = {
		subTotal: this.getLocale('checkOutLocales', 'subTotal'),
		tax: this.getLocale('checkOutLocales', 'tax'),
		total: this.getLocale('checkOutLocales', 'total'),
		cashButton: this.getLocale('checkOutLocales', 'cashButton'),
		discountButton: this.getLocale('checkOutLocales', 'discountButton'),
		creditCardButton: this.getLocale('checkOutLocales', 'creditCardButton'),
		settingButton: this.getLocale('checkOutLocales', 'settingButton')
	};

	ngOnInit() {
		this.selectedItemsSub = this.store.select('selectedItems').subscribe((selectedItemsState) => {
			this.subTotal = selectedItemsState.subTotal;
			this.tax = selectedItemsState.tax;
			this.totalCost = selectedItemsState.totalCost;
		});
	}

	ngOnDestroy() {
		this.selectedItemsSub.unsubscribe();
	}

	cashCheckout() {
		this.modalService.openModal(this.cashCheckoutComponent);
	}

	finishPayment() {
		this.store.dispatch(new SelectedItemsActions.CleanItemsStart());
	}

}
