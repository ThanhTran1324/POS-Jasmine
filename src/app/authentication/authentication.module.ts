import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from '../authentication/password-reset/password-reset.component';

@NgModule({
	declarations: [
		AuthComponent,
		LoginComponent,
		SignupComponent,
		PasswordResetComponent,
	],
	imports: [
		CommonModule,
		AngularMaterialModule,
		ReactiveFormsModule,
		AuthRoutingModule,
		FlexLayoutModule,
	],
	entryComponents: [AuthComponent],
})
export class AuthModule {}
