import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuCreatorComponent } from './admin/menu-creator/menu-creator.component';
import { GroupFormComponent } from './admin/menu-creator/tab-form/group-form.component';
import { ItemFormComponent } from './admin/menu-creator/item-form/item-form.component';
import { AdminComponent } from './admin/admin.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MenuItemListComponent } from './user-menu/menu-item-list/menu-item-list.component';
import { MenuResolver } from './menu.resolver';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';
import { CashComponent } from './checkout/cash/cash.component';
import { SelectedItemsEffect } from './selected-items.effect';

@NgModule({
	imports: [
		CommonModule,
		AngularMaterialModule,
		FlexLayoutModule,
		HomeRoutingModule,
		ReactiveFormsModule,
		SharedModule,
		EffectsModule.forFeature([SelectedItemsEffect]),
	],
	exports: [],
	declarations: [
		HomePageComponent,
		NavBarComponent,
		MenuCreatorComponent,
		GroupFormComponent,
		ItemFormComponent,
		AdminComponent,
		UserMenuComponent,
		MenuItemListComponent,
		CartComponent,
		CheckoutComponent,
		CashComponent,
	],
	providers: [MenuResolver],
})
export class HomeModule {}
