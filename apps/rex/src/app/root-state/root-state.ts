import * as CurrentUserStoreState from './current-user/current-user.state';

export interface RootStoreState {
	currentUser: CurrentUserStoreState.State;
	toasts: CurrentUserStoreState.State;
}
