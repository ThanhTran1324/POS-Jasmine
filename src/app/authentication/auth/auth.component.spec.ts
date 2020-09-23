import { DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { UtilitiesService } from 'src/app/services/utilities.service';

import { AuthModule } from '../authentication.module';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
	let component: AuthComponent;
	let fixture: ComponentFixture<AuthComponent>;
	let el: DebugElement;
	let utilitiesService: any;

	beforeEach(async(() => {
		const utilitiesServiceSpy = jasmine.createSpyObj('UltilitiesService', ['getImageUrl', 'getDefaultImage']);
		TestBed.configureTestingModule({
			imports: [
				AuthModule,
				NoopAnimationsModule,
				AppRoutingModule
			],
			providers: [
				{ provide: UtilitiesService, useValue: utilitiesServiceSpy }
			]
		})
			.compileComponents().then(() => {
				fixture = TestBed.createComponent(AuthComponent);
				utilitiesService = TestBed.get(UtilitiesService);
				component = fixture.componentInstance;
				el = fixture.debugElement;
			});
	}));

	fit('should create Auth Component', () => {
		expect(component).toBeTruthy();
	});

	fit('Should get background Image from Ultility Service', fakeAsync(() => {
		utilitiesService.getImageUrl.and.returnValue('LinkImage');
		fixture.detectChanges();
		flush();
		expect(component.backgroundUrl).toBe('LinkImage');
	}));
});
