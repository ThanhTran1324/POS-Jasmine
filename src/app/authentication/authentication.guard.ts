import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Route, CanLoad, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

	constructor(
		private store: Store<fromRoot.State>,
		private router: Router
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
		: boolean | UrlTree | Observable<boolean | UrlTree> {
		return this.store.select(fromRoot.getIsAuth).pipe(
			take(1),
			map(isAuth => {
				if (!isAuth) {
					return this.router.createUrlTree(['/login']);
				}
				return isAuth;
			})
		);
	}

	canLoad(route: Route)
		: boolean | UrlTree | Observable<boolean | UrlTree> {
		return this.store.select(fromRoot.getIsAuth).pipe(
			take(1),
			map(isAuth => isAuth)
		);
	}
}
