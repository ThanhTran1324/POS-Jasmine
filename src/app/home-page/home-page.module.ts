import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		AngularMaterialModule,
		FlexLayoutModule,
		HomeRoutingModule,
		ReactiveFormsModule,
		SharedModule,
	],
	exports: [],
	declarations: [
		HomePageComponent,
		NavBarComponent,
	],
	providers: [],
})
export class HomeModule {}
