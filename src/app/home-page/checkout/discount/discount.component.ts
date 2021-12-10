import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalService } from 'src/app/shared/modal/modal.service';

import * as fromRoot from '../../../app.reducer';
import * as selectedItemsAction from '../../selected-items.actions';

@Component({
	selector: 'app-discount',
	templateUrl: './discount.component.html',
	styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
	selectedDiscountValue = new FormControl('');
	discountOptionList: Observable<number[]>;

	constructor(
		private store: Store<fromRoot.State>,
		private modalService: ModalService
	) {}

	ngOnInit(): void {
		this.discountOptionList = this.store.select('selectedItems').pipe(
			map((state) => {
				return state.discountOptionList;
			})
		);
	}

	onSubmitDiscount() {
		this.store.dispatch(
			selectedItemsAction.setDiscount({
				selectedDiscount: this.selectedDiscountValue.value,
			})
		);
		this.modalService.closeModal();
	}
}
