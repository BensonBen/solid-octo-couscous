import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { User } from '@solid-octo-couscous/model';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../../core';

import * as CurrentUserActions from './current-user.actions';

@Injectable()
export class CurrentUserStoreEffects {
	readonly createUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CurrentUserActions.createUserRequest),
			exhaustMap(({ newUserRequest }) => {
				return this.authService.createAccount(newUserRequest).pipe(
					tap(thing => this.authService.persistJwtTokenToSessionStorage(thing?.data?.jwtToken)),
					map(({ data }) => {
						const {
							approvalNotes,
							id,
							dateOfBirth,
							createdOn,
							description,
							email,
							isApproved,
							loginName,
							modifiedOn,
						} = data;
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
						return CurrentUserActions.signInRequestSuccess({ user });
					}),
					catchError(({ message, error }) =>
						of(CurrentUserActions.currentUserGenericError({ error, message }))
					)
				);
			})
		)
	);

	readonly loginUserSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CurrentUserActions.signInRequestSuccess),
			tap(({ user }) => {
				const { loginName } = user;
				this.matSnackBar.open(`Welcome! ${loginName ?? '_______'}. You're signed in`, undefined, {
					duration: 3000,
				});
			})
		)
	);

	readonly genericCurrentUserError$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CurrentUserActions.currentUserGenericError),
			tap(({ message }) => {
				this.matSnackBar.open(message, undefined, {
					duration: 3000,
				});
			})
		)
	);

	public loginUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CurrentUserActions.loginUserRequest),
			exhaustMap(({ password, loginName }) => {
				return this.authService.loginWithEmailAndPassword({ password, loginName }).pipe(
					tap(thing => this.authService.persistJwtTokenToSessionStorage(thing?.data?.jwtToken)),
					map(({ data }) => {
						const {
							approvalNotes,
							id,
							dateOfBirth,
							createdOn,
							description,
							email,
							isApproved,
							loginName,
							modifiedOn,
						} = data;
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
						return CurrentUserActions.signInRequestSuccess({ user });
					}),
					catchError(({ message, error }) =>
						of(CurrentUserActions.currentUserGenericError({ error, message }))
					)
				);
			})
		)
	);

	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService,
		private readonly matSnackBar: MatSnackBar
	) {}
}
