import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LocalesService } from '../../services/locales.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
	selector: 'app-page-not-found404',
	templateUrl: './page-not-found404.component.html',
	styleUrls: ['./page-not-found404.component.scss']
})

export class PageNotFound404Component implements OnInit {
	constructor(
		private router: Router,
		private localesService: LocalesService,
		private utilitiesService: UtilitiesService,
	) { }

	getLocale = this.localesService.getLocale;

	redirectTime = 10;
	backgroundUrl: string;
	timeInterval: number;
	locales = {
		title: this.getLocale('pageNotFound', 'title'),
		subTitle: this.getLocale('pageNotFound', 'subTitle'),
		desc: this.getLocale('pageNotFound', 'description').replace('@@value', this.redirectTime),
		backButton: this.getLocale('pageNotFound', 'backButton'),
	};

	async ngOnInit() {
		try {
			const imageUrl = await this.utilitiesService.getImageUrl();
			this.backgroundUrl = imageUrl;
		}
		catch {
			this.backgroundUrl = this.utilitiesService.getDefaultImage();
		}
		this.redirectToHome();
	}

	redirectToHome() {
		this.timeInterval = window.setInterval(() => {
			this.redirectTime--;
			this.locales.desc = this.getLocale('pageNotFound', 'description').replace('@@value', this.redirectTime);
			if (this.redirectTime === 0) {
				clearInterval(this.timeInterval);
				this.router.navigate(['/']);
			}
		}, 1000);
	}
}
