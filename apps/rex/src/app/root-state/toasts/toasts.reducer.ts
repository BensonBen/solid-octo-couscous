import { createReducer, on } from '@ngrx/store';
import * as ToastStoreActions from './toasts.actions';
import { initialState } from './toasts.state';

export const toastStoreReducer = createReducer(
	initialState
	// on(ToastStoreActions.openSnackBar, state => ({
	// 	...state,
	// 	loading: true,
	// 	error: {},
	// 	isLoaded: false,
	// })),
	// on(ToastStoreActions.closeSnackBar, state => ({
	// 	...state,
	// 	isLoaded: false,
	// 	loading: false,
	// }))
);
