import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { RootStoreState } from '../root-state';
import { getError, getIsLoading } from '../shared/shared.state-functions';
import { State } from './current-user.state';

export const currentUser: keyof RootStoreState = 'currentUser';

export const currentUserStoreState: MemoizedSelector<RootStoreState, State> = createFeatureSelector<State>(currentUser);

export const hasError: MemoizedSelector<RootStoreState, any> = createSelector(currentUserStoreState, getError);

export const isLoading: MemoizedSelector<RootStoreState, boolean> = createSelector(currentUserStoreState, getIsLoading);
