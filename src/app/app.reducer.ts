import {
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
} from '@ngrx/store';

import * as fromSpinner from './shared/spinner/spinner.reducer';
import * as fromNotification from './shared/notification/notification.reducer';
import * as fromAuth from './authentication/authentication.reducer';
import * as fromMenu from './home-page/pos/menu.reducer';
import * as fromSelectedItems from './home-page/pos/selected-items.reducer';

export interface State {
	spinner: fromSpinner.State;
	auth: fromAuth.State;
	notification: fromNotification.NotificationData[];
	menu: fromMenu.State;
	selectedItems: fromSelectedItems.State;
}

export const reducers: ActionReducerMap<State> = {
	spinner: fromSpinner.spinnerReducer,
	auth: fromAuth.authReducer,
	notification: fromNotification.notificationReducer,
	menu: fromMenu.reducer,
	selectedItems: fromSelectedItems.reducer,
};

export const getSpinnerState = createFeatureSelector<fromSpinner.State>(
	'spinner'
);
export const showSpinner = createSelector(
	getSpinnerState,
	fromSpinner.showSpinner
);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const getNotificationState = createFeatureSelector<
	fromNotification.NotificationData[]
>('notification');
export const showNotification = createSelector(
	getNotificationState,
	fromNotification.showNotification
);
