import { Component } from '@angular/core';
import { LocalesService } from '../../services/locales.service';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent {
	constructor(private localesService: LocalesService) { }
	getLocale = this.localesService.getLocale;
	locales = {
		loading: this.getLocale('spinnerLocales', 'loading')
	};
}
