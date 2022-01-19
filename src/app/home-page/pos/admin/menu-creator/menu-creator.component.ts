import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { LocalesService } from '../../../../services/locales.service';
import { MenuGroup, MenuItem } from '../../../../model/menu-model';
import { GroupFormComponent } from './tab-form/group-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { MenuService } from '../../menu.service';

@Component({
	selector: 'app-menu-creator',
	templateUrl: './menu-creator.component.html',
	styleUrls: ['./menu-creator.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class MenuCreatorComponent implements OnDestroy, OnInit {
	constructor(
		private localesService: LocalesService,
		private dialog: MatDialog,
		private menuService: MenuService
	) {}

	menuList: MenuGroup[];
	editingGroup: MenuGroup;
	editingItemIndex: number;
	dialogSub: Subscription;
	menuSub: Subscription;
	getLocale = this.localesService.getLocale;
	locales = {
		dropMenuEdit: this.getLocale('menuCreatorLocales', 'dropMenuEdit'),
		dropMenuDelete: this.getLocale('menuCreatorLocales', 'dropMenuDelete'),
		addItemButton: this.getLocale('menuCreatorLocales', 'addItemButton'),
	};

	ngOnInit() {
		this.menuSub = this.menuService.getMenu().subscribe((menuList) => {
			this.menuList = menuList;
		});
	}

	ngOnDestroy() {
		this.menuSub.unsubscribe();

		if (this.dialogSub) {
			this.dialogSub.unsubscribe();
		}
	}

	trackGroubById(index: number, group: MenuGroup) {
		return group.id;
	}

	onGroupModify(editingGroup?: MenuGroup) {
		this.editingGroup = editingGroup;
		this.openModal(GroupFormComponent, editingGroup);
	}

	onGroupDelete(menuGroupId: string) {
		this.menuService.deleteMenuGroup(menuGroupId);
	}

	openModal(formComponent, formData: MenuItem | MenuGroup) {
		const dialogRef = this.dialog.open(formComponent, {
			data: formData,
		});

		this.dialogSub = dialogRef.afterClosed().subscribe((newFormData) => {
			if (newFormData) {
				this.submitNewMenuGroup(newFormData);
			}
		});
	}

	onItemModify(editingGroup: MenuGroup, itemIndex?: number) {
		this.editingGroup = editingGroup;
		this.editingItemIndex = itemIndex;
		this.openModal(ItemFormComponent, editingGroup.items[itemIndex]);
	}

	onItemDelete(editingGroup: MenuGroup, itemIndex: number) {
		this.menuService.deleteMenuItem(editingGroup, itemIndex);
	}

	submitNewMenuGroup(newFormData: MenuGroup | MenuItem) {
		if (!this.editingGroup) {
			this.menuService.addNewMenuGroup(newFormData);
		} else {
			this.menuService.editMenuGroup(
				this.editingGroup,
				this.editingItemIndex,
				newFormData
			);
		}
	}
}
