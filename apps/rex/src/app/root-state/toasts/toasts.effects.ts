import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { first, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as ToastStoreActions from './toasts.actions';
import { Noop } from '../shared/shared.actions';

@Injectable()
export class ToastStoreEffects {
	public readonly openToast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ToastStoreActions.openSnackBar),
			first(),
			map(({ action, message, config }) => {
				this.matSnackBar.open(message, action, config);
				return Noop();
			})
		)
	);

	constructor(private readonly actions$: Actions, private readonly matSnackBar: MatSnackBar) {}
}
