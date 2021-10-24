import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { LoginUserResponse, User } from '@solid-octo-couscous/model';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../core';

import * as CurrentUserActions from './current-user.actions';
import * as ToastActions from '../toasts/toasts.actions';
import { of } from 'rxjs';
@Injectable()
export class CurrentUserStoreEffects {
	readonly createUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CurrentUserActions.createUserRequest),
			switchMap(({ newUserRequest }) => {
				return this.authService.createAccount(newUserRequest).pipe(
					tap(({ data }) => this.authService.persistJwtTokenToSessionStorage(data?.jwtToken)),
					map(({ data }) => {
						const user = this.transform(data);
						return CurrentUserActions.signInRequestSuccess({ user });
					})
				);
			})
		)
	);

	public loginUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CurrentUserActions.loginUserRequest),
			switchMap(({ password, loginName }) => {
				return this.authService.loginWithEmailAndPassword({ password, loginName }).pipe(
					tap(thing => this.authService.persistJwtTokenToSessionStorage(thing?.data?.jwtToken)),
					map(({ data }) => {
						const user = this.transform(data);
						return CurrentUserActions.signInRequestSuccess({ user });
					})
				);
			})
		)
	);

	public signInRequestSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CurrentUserActions.signInRequestSuccess),
			map(({ user }) => {
				const message = `Welcome ${user?.loginName ?? 'blank'}!`;
				return ToastActions.openSnackBar({ message, action: 'dismiss' });
			})
		)
	);

	constructor(private readonly actions$: Actions, private readonly authService: AuthService) {}

	private readonly transform = (data: LoginUserResponse): Omit<User, 'password'> => {
		const { approvalNotes, id, dateOfBirth, createdOn, description, email, isApproved, loginName, modifiedOn } = data;
		const user: Omit<User, 'password'> = {
			approvalNotes,
			id,
			dateOfBirth,
			createdOn,
			description,
			email,
			isApproved,
			loginName,
			modifiedOn,
		};

		return user;
	};
}
