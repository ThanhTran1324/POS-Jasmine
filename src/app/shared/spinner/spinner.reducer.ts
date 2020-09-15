import { SpinnerActions, SHOW_SPINNER, HIDE_SPINNER } from './spinner.actions';

export interface State {
	showSpinner: boolean;
}

const initialState: State = {
	showSpinner: false
};

export function spinnerReducer(state = initialState, action: SpinnerActions) {
	switch (action.type) {
		case SHOW_SPINNER:
			return {
				showSpinner: true
			};
		case HIDE_SPINNER:
			return {
				showSpinner: false
			};
		default: {
			return state;
		}
	}
}

export const showSpinner = (state: State) => state.showSpinner;
