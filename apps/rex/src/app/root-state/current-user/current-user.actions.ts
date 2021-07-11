import { createAction, props } from '@ngrx/store';
import { NewUserRequest, User } from '@solid-octo-couscous/model';

const currentUserPreamble = `[Current User]`;

export const loginUserRequest = createAction(
	`${currentUserPreamble} Login Request`,
	props<{ loginName: string; password: string }>()
);

export const signInRequestSuccess = createAction(
	`${currentUserPreamble} Login Request Success`,
	props<{ user: Omit<User, 'password'> }>()
);

export const currentUserGenericError = createAction(
	`${currentUserPreamble} Login Request Error`,
	props<{ error: Record<string, string>; message }>()
);

export const createUserRequest = createAction(
	`${currentUserPreamble} Create Request`,
	props<{ newUserRequest: NewUserRequest }>()
);
