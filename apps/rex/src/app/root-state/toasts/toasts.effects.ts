import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { take, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as ToastActions from './toasts.actions';

@Injectable()
export class ToastStoreEffects {
	public readonly openToast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ToastActions.openSnackBar),
			take(3),
			tap(({ action, message, config }) => {
				debugger;
				// this.matSnackBar.open(message, action, config);
			})
		)
	);

	constructor(private readonly actions$: Actions, private readonly matSnackBar: MatSnackBar) {}
}
