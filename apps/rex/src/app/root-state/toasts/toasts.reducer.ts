import { createReducer } from '@ngrx/store';
import { initialState } from './toasts.state';

export const toastStoreReducer = createReducer(initialState);
