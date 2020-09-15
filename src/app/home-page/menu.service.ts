import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, finalize } from 'rxjs/operators';

import * as fromRoot from '../app.reducer';
import * as MenuActions from './menu.actions';
import { MenuGroup, FbMenuResponseData, MenuItem } from '../model/menu-model';
import { LoggingService } from '../services/logging.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { NotificationService } from '../shared/notification/notification.service';
import { LocalesService } from '../services/locales.service';

@Injectable()
export class MenuService {
	constructor(
		private store: Store<fromRoot.State>,
		private db: AngularFirestore,
		private loggingService: LoggingService,
		private spinnerService: SpinnerService,
		private notificationService: NotificationService,
		private localesService: LocalesService,
	) { }

	menuCollection = this.db.collection('menu');
	getLocale = this.localesService.getLocale;

	fetchMenu() {
		this.spinnerService.showSpinner();
		this.menuCollection
			.valueChanges({ idField: 'id' })
			.pipe(
				take(1),
				finalize(() => {
					this.spinnerService.hideSpinner();
				}),
				map((docArray: FbMenuResponseData[]) => {
					return docArray.map(doc => {
						return {
							id: doc.id,
							name: doc.name,
							items: doc.items
						};
					});
				})
			)
			.subscribe((menu: MenuGroup[]) => {
				this.store.dispatch(new MenuActions.SetMenu(menu));
			},
				error => {
					this.loggingService.info('<<<< Response <<<< ', error);
				}
			);
	}

	getMenu() {
		return this.store.select('menu').pipe(
			map(menuState => {
				return menuState.menuList;
			})
		);
	}

	addNewMenuGroup(newFormData: MenuGroup) {
		this.spinnerService.showSpinner();
		const newMenuGroup = {
			name: newFormData.name,
			items: []
		};
		this.menuCollection.add(newMenuGroup)
			.then((responseData) => {
				this.notificationService.showRegularNotification(
					this.getLocale('menuServiceLocales', 'menuUpdateSuccess'));
				this.store.dispatch(new MenuActions.AddMenuGroup({
					id: responseData.id,
					...newMenuGroup
				}));
			})
			.catch((error) => {
				this.notificationService.showErrorNotification(
					this.getLocale('menuServiceLocales', 'error'));
				this.loggingService.info('<<<< Response <<<< ', error);
			}).finally(() => {
				this.spinnerService.hideSpinner();
			});
	}

	checkIsItemType(p: any): p is MenuItem {
		return p.hasOwnProperty('price');
	}

	submitAndDispatchEditedGroup(editedGroup: MenuGroup) {
		this.spinnerService.showSpinner();
		this.menuCollection.doc(editedGroup.id).set(editedGroup)
			.then(() => {
				this.notificationService.showRegularNotification(
					this.getLocale('menuServiceLocales', 'menuUpdateSuccess'));
				this.store.dispatch(new MenuActions.EditMenuGroup(editedGroup));
			})
			.catch((error) => {
				this.notificationService.showErrorNotification(
					this.getLocale('menuServiceLocales', 'error'));
				this.loggingService.info('<<<< Response <<<< ', error);
			}).finally(() => {
				this.spinnerService.hideSpinner();
			});
	}

	createNewGroup(editingGroup: MenuGroup, itemIndex: number, newFormData: MenuItem | MenuGroup) {
		const newGroup = { ...editingGroup };
		if (this.checkIsItemType(newFormData)) {
			const newItemList = [...editingGroup.items];
			if (newItemList[itemIndex]) {
				newItemList.splice(itemIndex, 1, newFormData);
			} else {
				newItemList.push(newFormData);
			}
			newGroup.items = newItemList;
		}
		else {
			newGroup.name = newFormData.name;
		}
		return newGroup;
	}

	editMenuGroup(editingGroup: MenuGroup, itemIndex: number, newFormData: MenuItem | MenuGroup) {
		const newGroup = this.createNewGroup(editingGroup, itemIndex, newFormData);
		this.submitAndDispatchEditedGroup(newGroup);
	}

	deleteMenuGroup(menuGroupId: string) {
		this.spinnerService.showSpinner();
		this.menuCollection.doc(menuGroupId).delete()
			.then(() => {
				this.notificationService.showRegularNotification(
					this.getLocale('menuServiceLocales', 'deleteSuccess'));
				this.store.dispatch(new MenuActions.DeleteMenuGroup({ menuGroupId }));
			})
			.catch((error) => {
				this.notificationService.showErrorNotification(
					this.getLocale('menuServiceLocales', 'error'));
				this.loggingService.info('<<<< Response <<<< ', error);
			}).finally(() => {
				this.spinnerService.hideSpinner();
			});
	}

	deleteMenuItem(editingGroup: MenuGroup, itemIndex: number) {
		const newGroup = {
			...editingGroup,
			items: editingGroup.items.filter((item, index) => index !== itemIndex)
		};
		this.submitAndDispatchEditedGroup(newGroup);
	}
}
