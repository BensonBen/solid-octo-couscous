import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { RootStoreState } from '../root-state';
import { getError, getIsLoading } from '../shared/shared.state-functions';
import { State } from './toasts.state';

export const toasts: keyof RootStoreState = 'toasts';

export const currentUserStoreState: MemoizedSelector<RootStoreState, State> = createFeatureSelector<State>(toasts);

export const hasError: MemoizedSelector<RootStoreState, Record<string, string>> = createSelector(
	currentUserStoreState,
	getError
);

export const isLoading: MemoizedSelector<RootStoreState, boolean> = createSelector(currentUserStoreState, getIsLoading);
