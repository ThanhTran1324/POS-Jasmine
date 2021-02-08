import { Action, createAction, props } from '@ngrx/store';
import { MenuGroup } from '../model/menu-model';

// export const SET_MENU = '[Menu] Set Menu';
export const ADD_MENU_GROUP = '[Menu] Add Menu Group';
export const EDIT_MENU_GROUP = '[Menu] Edit Menu Group';
export const DELETE_MENU_GROUP = '[Menu] Delete Menu Group';

export const SetMenu = createAction(
	'[Menu] Set Menu',
	props<{ menuGroup: MenuGroup[] }>()
);

// export class SetMenu implements Action {
// 	readonly type = SET_MENU;
// 	constructor(public payload: MenuGroup[]) {}
// }

export class AddMenuGroup implements Action {
	readonly type = ADD_MENU_GROUP;
	constructor(public payload: MenuGroup) {}
}

export class EditMenuGroup implements Action {
	readonly type = EDIT_MENU_GROUP;
	constructor(public payload: MenuGroup) {}
}

export class DeleteMenuGroup implements Action {
	readonly type = DELETE_MENU_GROUP;
	constructor(public payload: { menuGroupId: string }) {}
}

export type MenuActions =
	// | SetMenu
	AddMenuGroup | EditMenuGroup | DeleteMenuGroup;
