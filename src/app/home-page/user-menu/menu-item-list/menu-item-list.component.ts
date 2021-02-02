import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { MenuGroup, MenuItem } from 'src/app/model/menu-model';
import { Subscription } from 'rxjs';
import { MenuService } from '../../menu.service';
import * as fromRoot from '../../../app.reducer';
import * as SelectedItemsActions from '../../selected-items.actions';

@Component({
	selector: 'app-menu-item-list',
	templateUrl: './menu-item-list.component.html',
	styleUrls: ['./menu-item-list.component.scss'],
})
export class MenuItemListComponent implements OnInit, OnDestroy {
	constructor(
		private router: ActivatedRoute,
		private menuService: MenuService,
		private store: Store<fromRoot.State>
	) {}

	menuSub: Subscription;
	menuGroup: MenuGroup;

	ngOnInit() {
		this.menuSub = this.menuService.getMenu().subscribe((menuList) => {
			if (menuList) {
				const id = this.router.snapshot.paramMap.get('id');
				this.menuGroup = menuList.find((item) => item.id === id);
			}
		});
	}

	ngOnDestroy() {
		this.menuSub.unsubscribe();
	}

	trackItemByIndex(itemIndex: number) {
		return itemIndex;
	}

	addItemToCart(item: MenuItem) {
		this.store.dispatch(new SelectedItemsActions.AddItem(item));
	}
}
