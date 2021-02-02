import { DebugElement } from '@angular/core';
import {
	async,
	ComponentFixture,
	fakeAsync,
	flush,
	TestBed,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';
import { UtilitiesService } from 'src/app/services/utilities.service';

import { AuthModule } from '../authentication.module';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
	let component: AuthComponent;
	let fixture: ComponentFixture<AuthComponent>;
	let el: DebugElement;
	let utilitiesServiceSpy: any;

	beforeEach(async(() => {
		utilitiesServiceSpy = jasmine.createSpyObj('UltilitiesService', [
			'getImageUrl',
			'getDefaultImage',
		]);
		TestBed.configureTestingModule({
			imports: [AuthModule, NoopAnimationsModule, AppRoutingModule],
			providers: [
				{ provide: UtilitiesService, useValue: utilitiesServiceSpy },
			],
		})
			.compileComponents()
			.then(() => {
				fixture = TestBed.createComponent(AuthComponent);
				component = fixture.componentInstance;
				el = fixture.debugElement;
			});
	}));

	it('Should create Auth Component', () => {
		expect(component).toBeTruthy();
	});

	it('Should get background Image from Ultility Service', fakeAsync(() => {
		utilitiesServiceSpy.getImageUrl.and.returnValue(
			Promise.resolve('LinkImage')
		);
		component.ngOnInit();
		fixture.detectChanges();
		flush();
		expect(utilitiesServiceSpy.getImageUrl).toHaveBeenCalled();
		expect(component.backgroundUrl).toBe('LinkImage');
	}));

	it('Should Not get background image from Ultility Service', fakeAsync(() => {
		utilitiesServiceSpy.getImageUrl.and.returnValue(
			Promise.reject({
				error: 'error',
			})
		);
		utilitiesServiceSpy.getDefaultImage.and.returnValue('DefaultLinkImage');
		component.ngOnInit();
		flush();
		expect(utilitiesServiceSpy.getImageUrl).toHaveBeenCalled();
		expect(utilitiesServiceSpy.getDefaultImage).toHaveBeenCalled();
		expect(component.backgroundUrl).toBe('DefaultLinkImage');
	}));
});
