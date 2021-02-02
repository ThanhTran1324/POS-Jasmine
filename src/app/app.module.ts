import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './authentication/authentication.module';
import { environment } from 'src/environments/environment';

import { LocalesService } from './services/locales.service';
import { LoggingService } from './services/logging.service';
import { UtilitiesService } from './services/utilities.service';

import { RequestLoggingInterceptor } from '../app/interceptor/request-logging.interceptor';
import { ResponseLoggingInterceptor } from '../app/interceptor/response-logging.interceptor';

import { reducers } from './app.reducer';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AngularMaterialModule,
		SharedModule,
		FlexLayoutModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot(),
		AuthModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [
		LocalesService,
		LoggingService,
		UtilitiesService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestLoggingInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ResponseLoggingInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
