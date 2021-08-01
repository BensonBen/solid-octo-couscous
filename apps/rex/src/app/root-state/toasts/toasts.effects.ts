import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as ToastActions from './toasts.actions';

@Injectable()
export class ToastStoreEffects {
	readonly createUser$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ToastActions.openSnackBar),
			tap(({ action, message, config }) => this.matSnackBar.open(message, action, config))
		)
	);

	constructor(private readonly actions$: Actions, private readonly matSnackBar: MatSnackBar) {}
}
