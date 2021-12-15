import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/modal/modal.service';

import * as fromRoot from '../../../app.reducer';
import * as selectedItemsAction from '../../selected-items.actions';

@Component({
	selector: 'app-discount',
	templateUrl: './discount.component.html',
	styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit, OnDestroy {
	discountOptionList: number[];
	selectedDiscountForm = new FormControl();
	selectedItemsStateSub: Subscription;

	constructor(
		private store: Store<fromRoot.State>,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		this.getSelectedItemsState();
	}

	ngOnDestroy(): void {
		this.selectedItemsStateSub.unsubscribe();
	}

	getSelectedItemsState() {
		this.selectedItemsStateSub = this.store
			.select('selectedItems')
			.subscribe((state) => {
				this.discountOptionList = state.discountOptionList;
				this.selectedDiscountForm.setValue(state.activatedDiscount);
			});
	}

	onSubmitDiscount() {
		this.store.dispatch(
			selectedItemsAction.setDiscount({
				selectedDiscount: this.selectedDiscountForm.value,
			})
		);
		this.modalService.closeModal();
	}
}
