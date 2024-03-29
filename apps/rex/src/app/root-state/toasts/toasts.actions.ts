import { createAction, props } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

const toastStorePreamble = `[Toast]`;

export const openSnackBar = createAction(
	`${toastStorePreamble} Add Toast`,
	props<{ message: string; action: string; config?: MatSnackBarConfig }>()
);

export const closeSnackBar = createAction(`${toastStorePreamble} Remove Toast`, props<{ id: string }>());
