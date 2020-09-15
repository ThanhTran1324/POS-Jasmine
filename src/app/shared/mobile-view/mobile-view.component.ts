import { Component } from '@angular/core';
import { LocalesService } from '../../services/locales.service';

@Component({
	selector: 'app-mobile-view',
	templateUrl: './mobile-view.component.html',
	styleUrls: ['./mobile-view.component.scss']
})
export class MobileViewComponent {

	constructor(private localesService: LocalesService) { }

	getLocale = this.localesService.getLocale;
	locales = {
		notice: this.getLocale('mobileViewLocales', 'notice')
	};
}
