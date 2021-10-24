import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { first, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as ToastStoreActions from './toasts.actions';

@Injectable()
export class ToastStoreEffects {
	public readonly openToast$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(ToastStoreActions.openSnackBar),
				first(),
				tap(({ action, message, config }) => this.matSnackBar.open(message, action, config))
			),
		{ dispatch: false }
	);

	constructor(private readonly actions$: Actions, private readonly matSnackBar: MatSnackBar) {}
}
