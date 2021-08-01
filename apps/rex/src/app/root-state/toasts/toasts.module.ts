import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastStoreEffects } from './toasts.effects';
import { toastStoreReducer } from './toasts.reducer';
import { toasts } from './toasts.selectors';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	imports: [
		CommonModule,
		MatSnackBarModule,
		StoreModule.forFeature(toasts, toastStoreReducer),
		EffectsModule.forFeature([ToastStoreEffects]),
	],
	providers: [ToastStoreEffects],
})
export class ToastStoreModule {}
