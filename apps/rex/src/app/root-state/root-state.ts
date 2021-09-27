import * as CurrentUserStoreState from './current-user/current-user.state';
import * as ToastStoreState from './toasts/toasts.state';
export interface RootStoreState {
	currentUser: CurrentUserStoreState.State;
	toasts: ToastStoreState.State;
}
