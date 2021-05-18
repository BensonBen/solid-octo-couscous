import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { LoginUserResponse, User } from '@solid-octo-couscous/model';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../core';

import * as CurrentUserActions from './current-user.actions';

@Injectable()
export class CurrentUserStoreEffects {
	readonly createUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CurrentUserActions.createUserRequest),
			switchMap(({ newUserRequest }) => {
				console.table([newUserRequest]);
				return this.authService.createAccount(newUserRequest).pipe(
					tap(({ data }) => {
						console.log(data?.jwtToken);
						this.authService.persistJwtTokenToSessionStorage(data?.jwtToken);
					}),
					map(({ data }) => {
						const user = this.transform(data);
						return CurrentUserActions.signInRequestSuccess({ user });
					})
				);
			})
		)
	);

	// readonly loginUserSuccess$ = createEffect(() =>
	// 	this.actions$.pipe(
	// 		ofType(CurrentUserActions.signInRequestSuccess),
	// 		tap(({ user }) => {
	// 			const { loginName } = user;
	// 			this.matSnackBar.open(`Welcome! ${loginName ?? '_______'}. You're signed in`);
	// 		})
	// 	)
	// );

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

	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService,
		private readonly matSnackBar: MatSnackBar
	) {}

	private readonly transform = (data: LoginUserResponse): Omit<User, 'password'> => {
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

		return user;
	};
}
