import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastStoreEffects } from './toasts.effects';
import { currentUserStoreReducer } from './toasts.reducer';
import { currentUser } from './toasts.selectors';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(currentUser, currentUserStoreReducer),
		EffectsModule.forFeature([ToastStoreEffects]),
	],
	providers: [ToastStoreEffects],
})
export class CurrentUserStoreModule {}
