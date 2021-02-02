import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './authentication.actions';

export interface State {
	isAuthenticated: boolean;
	userEmail: string;
}

const initialState: State = { isAuthenticated: false, userEmail: null };

const authReducerCreator = createReducer(
	initialState,
	on(AuthActions.SetAuthenticated, (state, { userEmail }) => ({
		isAuthenticated: true,
		userEmail,
	})),
	on(AuthActions.SetUnauthenticated, (state) => ({
		isAuthenticated: false,
		userEmail: null,
	}))
);

export function authReducer(state: State | undefined, action: Action) {
	return authReducerCreator(state, action);
}

export const getIsAuth = (state: State) => state.isAuthenticated;
