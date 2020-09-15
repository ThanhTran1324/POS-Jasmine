import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { UnsplashResponseData } from '../model/auth-model';

@Injectable()
export class UtilitiesService {
	constructor(
		private http: HttpClient,
	) { }

	backgroundImg: string;

	getDefaultImage() {
		return 'url(../../assets/bg.jpg) 0% 0% / cover';
	}

	getImageUrl(): Promise<string> {
		return new Promise((resolve, reject) => {
			if (this.backgroundImg) {
				resolve(this.backgroundImg);
				return;
			}

			this.http.get(environment.backgroundApi)
				.toPromise()
				.then((response: UnsplashResponseData) => {
					if (response.urls && response.urls.regular) {
						this.backgroundImg = `url(${response.urls.regular}) 0% 0% / cover`;
						resolve(this.backgroundImg);
					}
					reject();
				}, (error) => {
					reject(error);
				});
		});
	}
}
