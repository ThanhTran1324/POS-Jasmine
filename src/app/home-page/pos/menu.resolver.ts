import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MenuService } from './menu.service';

@Injectable()
export class MenuResolver implements Resolve<any> {
	constructor(private menuService: MenuService) {}

	alreadyFetched = false;

	resolve(route: ActivatedRouteSnapshot) {
		if (!this.alreadyFetched) {
			this.menuService.fetchMenu();
			this.alreadyFetched = true;
		}
	}
}
