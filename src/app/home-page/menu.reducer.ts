import { Action, createReducer, on } from '@ngrx/store';
import * as MenuActions from './menu.actions';
import { MenuGroup } from '../model/menu-model';

export interface State {
	menuList: MenuGroup[];
}

const initialState: State = {
	menuList: [],
};

const menuReducer = createReducer(
	initialState,
	on(MenuActions.SetMenu, (state, { menuGroup }) => ({
		...state,
		menuList: [...menuGroup],
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return menuReducer(state, action);
}

// export function menuReducer(state: State = initialState, action: MenuActions) {
// 	switch (action.type) {
// 		case SET_MENU:
// 			return {
// 				...state,
// 				menuList: [...action.payload],
// 			};
// 		case ADD_MENU_GROUP:
// 			return {
// 				...state,
// 				menuList: [...state.menuList, action.payload],
// 			};
// 		case EDIT_MENU_GROUP:
// 			return {
// 				...state,
// 				menuList: [...state.menuList].map((menuGroupElement) => {
// 					return menuGroupElement.id === action.payload.id
// 						? action.payload
// 						: menuGroupElement;
// 				}),
// 			};
// 		case DELETE_MENU_GROUP:
// 			return {
// 				...state,
// 				menuList: [...state.menuList].filter((menuGroupElement) => {
// 					return menuGroupElement.id !== action.payload.menuGroupId;
// 				}),
// 			};
// 		default:
// 			return state;
// 	}
// }
