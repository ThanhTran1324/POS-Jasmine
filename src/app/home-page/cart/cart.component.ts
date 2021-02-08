import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import * as SelectedItemsActions from '../selected-items.actions';
import { SelectedItem, MenuItem } from '../../model/menu-model';
import { LocalesService } from '../../services/locales.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
	constructor(
		private store: Store<fromRoot.State>,
		private localesService: LocalesService
	) {}

	selectedItemsSub: Subscription;
	selectedItems: SelectedItem[];
	totalCost: number;
	getLocale = this.localesService.getLocale;
	locales = {
		itemHeader: this.getLocale('cartLocales', 'itemHeader'),
		qtyHeader: this.getLocale('cartLocales', 'qtyHeader'),
		priceHeader: this.getLocale('cartLocales', 'priceHeader'),
	};

	ngOnInit(): void {
		this.selectedItemsSub = this.store
			.select('selectedItems')
			.subscribe((selectedItemsState) => {
				this.selectedItems = selectedItemsState.selectedItems;
				this.totalCost = selectedItemsState.totalCost;
			});
	}

	ngOnDestroy() {
		this.selectedItemsSub.unsubscribe();
	}

	increaseItemQty(item: MenuItem) {
		this.store.dispatch(SelectedItemsActions.AddItem({ newItem: item }));
	}

	decreaseItemQty(index: number) {
		this.store.dispatch(
			SelectedItemsActions.RemoveItem({ itemIndex: index })
		);
	}
}
