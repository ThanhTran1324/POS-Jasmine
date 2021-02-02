import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class LoggingService {
	constructor() {}
	private isDebugMode: boolean = this.checkDebugMode();

	getUrlParams(search: string) {
		const hashes = search.slice(search.indexOf('?') + 1).split('&');
		const params = {};
		hashes.map((hash) => {
			const [key, val] = hash.split('=');
			params[key] = decodeURIComponent(val);
		});
		return params;
	}

	checkDebugMode() {
		const isProduction: boolean = environment.production;
		const urlParams = this.getUrlParams(window.location.search);

		if (!isProduction) {
			return true;
		}
		// tslint:disable-next-line: no-string-literal
		return urlParams['_debug'];
	}

	info(message: string, additionalData: any) {
		if (this.isDebugMode) {
			return console.log(message, additionalData);
		}
	}
}
