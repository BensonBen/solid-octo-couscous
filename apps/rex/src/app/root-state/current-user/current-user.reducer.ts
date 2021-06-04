import { createReducer, on } from '@ngrx/store';
import * as CurrentUserStoreActions from './current-user.actions';
import { initialState } from './current-user.state';

export const currentUserStoreReducer = createReducer(
	initialState,
	on(CurrentUserStoreActions.createUserRequest, CurrentUserStoreActions.loginUserRequest, state => ({
		...state,
		loading: true,
		error: null,
		isLoaded: false,
	})),
	on(CurrentUserStoreActions.signInRequestSuccess, (state, action) => ({
		...state,
		...action.user,
		isLoaded: true,
		loading: false,
	})),
	on(CurrentUserStoreActions.currentUserGenericError, (state, { error }) => ({
		...state,
		error,
		isLoaded: false,
		loading: false,
	}))
);
