import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { withLatestFrom, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as SelectedItemsActions from './selected-items.actions';
import * as fromRoot from '../app.reducer';
import { SelectedItemsService } from './selected-items.service';
import { SpinnerService } from '../shared/spinner/spinner.service';
import { LoggingService } from '../services/logging.service';
import { NotificationService } from '../shared/notification/notification.service';
import { LocalesService } from '../services/locales.service';

@Injectable()
export class SelectedItemsEffect {
	constructor(
		private actions$: Actions,
		private store: Store<fromRoot.State>,
		private selectedItemsService: SelectedItemsService,
		private spinnerService: SpinnerService,
		private loggingService: LoggingService,
		private notificationService: NotificationService,
		private localesService: LocalesService
	) {}

	getlocale = this.localesService.getLocale;

	saveSelectedItem$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SelectedItemsActions.CleanItemsStart),
			withLatestFrom(this.store.select('selectedItems')),
			exhaustMap(([action, appStore]) => {
				this.spinnerService.showSpinner();
				return this.selectedItemsService
					.saveOrder(appStore)
					.then((responseData) => {
						this.notificationService.showRegularNotification(
							this.getlocale('cashLocales', 'submitSuccess')
						);
						this.loggingService.info(
							'<<<< Response <<<< ',
							responseData
						);
						return SelectedItemsActions.CleanItemsSuccess();
					})
					.catch((error) => {
						this.notificationService.showErrorNotification(
							this.getlocale('cashLocales', 'submitError')
						);
						this.loggingService.info('<<<< Response <<<< ', error);
						return SelectedItemsActions.CleanItemsError();
					})
					.finally(() => {
						this.spinnerService.hideSpinner();
					});
			})
		)
	);
}
