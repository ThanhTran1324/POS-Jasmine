import { Action } from '@ngrx/store';
import { MenuItem, SelectedItem } from '../model/menu-model';

export const ADD_ITEM = '[Selected Items] Add Item';
export const REMOVE_ITEM = '[Selected Items] Remove Item';
export const CLEANUP_ITEMS_START = '[Selected Items] Clean Up Items Start';
export const CLEANUP_ITEMS_ERROR = '[Selected Items] Clean Up Items Error';
export const CLEANUP_ITEMS_SUCCESS = '[Selected Items] Clean Up Items Success';

export class AddItem implements Action {
	readonly type = ADD_ITEM;
	constructor(public payload: MenuItem | SelectedItem) {}
}

export class RemoveItem implements Action {
	readonly type = REMOVE_ITEM;
	constructor(public payload: { index: number }) {}
}

export class CleanItemsStart implements Action {
	readonly type = CLEANUP_ITEMS_START;
}

export class CleanItemsError implements Action {
	readonly type = CLEANUP_ITEMS_ERROR;
}

export class CleanItemsSuccess implements Action {
	readonly type = CLEANUP_ITEMS_SUCCESS;
}

export type SelectedItemsActions =
	| AddItem
	| RemoveItem
	| CleanItemsStart
	| CleanItemsError
	| CleanItemsSuccess;
