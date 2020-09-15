import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MenuGroup } from 'src/app/model/menu-model';
import { MenuService } from '../menu.service';
@Component({
	selector: 'app-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {
	constructor(private menuService: MenuService) { }

	menuList: MenuGroup[];
	menuSub: Subscription;

	ngOnInit() {
		this.menuSub = this.menuService.getMenu()
			.subscribe(menuList => { this.menuList = menuList; });
	}

	ngOnDestroy() {
		this.menuSub.unsubscribe();
	}

	trackGroupById(index: number, menuGroub: MenuGroup) {
		return menuGroub.id;
	}
}
