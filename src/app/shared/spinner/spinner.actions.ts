import { Action } from '@ngrx/store';

export const SHOW_SPINNER = '[UI] Show Spinner';
export const HIDE_SPINNER = '[UI] Hide Spinner';

export class ShowSpinner implements Action {
	readonly type = SHOW_SPINNER;
}

export class HideSpinner implements Action {
	readonly type = HIDE_SPINNER;
}

export type SpinnerActions = ShowSpinner | HideSpinner;
