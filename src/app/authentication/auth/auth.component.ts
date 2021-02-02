import { Component, OnInit } from '@angular/core';

import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
	constructor(private utilitiesService: UtilitiesService) {}

	backgroundUrl: string;

	async ngOnInit() {
		try {
			const imageUrl = await this.utilitiesService.getImageUrl();
			this.backgroundUrl = imageUrl;
		} catch {
			this.backgroundUrl = this.utilitiesService.getDefaultImage();
		}
	}
}
