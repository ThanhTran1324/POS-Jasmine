import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { SelectedItemsEffect } from './selected-items.effect';

import { POSRoutingModule } from './pos-routing.module';
import { MenuCreatorComponent } from './admin/menu-creator/menu-creator.component';
import { GroupFormComponent } from './admin/menu-creator/tab-form/group-form.component';
import { ItemFormComponent } from './admin/menu-creator/item-form/item-form.component';
import { AdminComponent } from './admin/admin.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MenuItemListComponent } from './user-menu/menu-item-list/menu-item-list.component';
import { MenuResolver } from './menu.resolver';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../../shared/shared.module';
import { CashComponent } from './checkout/cash/cash.component';
import { DiscountComponent } from './checkout/discount/discount.component';
import { PosComponent } from './pos.component';


@NgModule({
	imports: [
		CommonModule,
		AngularMaterialModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		SharedModule,
		EffectsModule.forFeature([SelectedItemsEffect]),
		POSRoutingModule
	],
	exports: [],
	declarations: [
		MenuCreatorComponent,
		GroupFormComponent,
		ItemFormComponent,
		AdminComponent,
		UserMenuComponent,
		MenuItemListComponent,
		CartComponent,
		CheckoutComponent,
		CashComponent,
		DiscountComponent,
		PosComponent,
	],
	providers: [MenuResolver],
})
export class POSModule {}
