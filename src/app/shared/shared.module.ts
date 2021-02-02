import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SpinnerService } from './spinner/spinner.service';
import { AuthService } from '../authentication/authentication.service';
import { NotificationService } from './notification/notification.service';
import { MenuService } from '../home-page/menu.service';
import { ModalService } from './modal/modal.service';
import { SelectedItemsService } from '../home-page/selected-items.service';

import { MobileViewComponent } from './mobile-view/mobile-view.component';
import { NotificationComponent } from './notification/notification.component';
import { PageNotFound404Component } from './page-not-found404/page-not-found404.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
	declarations: [
		SpinnerComponent,
		MobileViewComponent,
		NotificationComponent,
		PageNotFound404Component,
		ModalComponent,
	],
	imports: [
		AngularMaterialModule,
		HttpClientModule,
		CommonModule,
		FlexLayoutModule,
	],
	providers: [
		SpinnerService,
		AuthService,
		NotificationService,
		MenuService,
		ModalService,
		SelectedItemsService,
	],
	exports: [
		SpinnerComponent,
		MobileViewComponent,
		NotificationComponent,
		PageNotFound404Component,
	],
})
export class SharedModule {}
