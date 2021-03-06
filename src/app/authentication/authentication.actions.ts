import { createAction, props } from '@ngrx/store';

export const SetAuthenticated = createAction(
	'[Auth] Set Authenticated',
	props<{ userEmail: string }>()
);
export const SetUnauthenticated = createAction('[Auth] Set Unauthenticated');

// OLD WAY
// import { Action } from '@ngrx/store';

// export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
// export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

// export class SetAuthenticated implements Action {
// 	readonly type = SET_AUTHENTICATED;
// 	constructor(public payload: { userEmail: string }) { }
// }

// export class SetUnauthenticated implements Action {
// 	readonly type = SET_UNAUTHENTICATED;
// }

// export type AuthActions = SetAuthenticated | SetUnauthenticated;
