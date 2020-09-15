import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as SpinnerActions from './spinner.actions';

@Injectable()
export class SpinnerService {
	constructor(
		private store: Store<fromRoot.State>
	) { }

	showSpinner() {
		this.store.dispatch(new SpinnerActions.ShowSpinner());
	}

	hideSpinner() {
		this.store.dispatch(new SpinnerActions.HideSpinner());
	}
}
