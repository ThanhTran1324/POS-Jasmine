import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './authentication.actions';

export interface State {
	isAuthenticated: boolean;
	userEmail: string;
}

const initialState: State = { isAuthenticated: false, userEmail: null };

export function authReducer(state: State = initialState, action: AuthActions) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				isAuthenticated: true,
				userEmail: action.payload.userEmail
			};
		case SET_UNAUTHENTICATED:
			return {
				isAuthenticated: false,
				userEmail: null
			};
		default:
			return state;
	}
}

export const getIsAuth = (state: State) => state.isAuthenticated;
