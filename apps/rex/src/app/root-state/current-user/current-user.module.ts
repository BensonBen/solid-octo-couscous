import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CurrentUserStoreEffects } from './current-user.effects';
import { currentUserStoreReducer } from './current-user.reducer';
import { currentUser } from './current-user.selectors';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(currentUser, currentUserStoreReducer),
		EffectsModule.forFeature([CurrentUserStoreEffects]),
	],
	providers: [CurrentUserStoreEffects],
})
export class CurrentUserStoreModule {}
