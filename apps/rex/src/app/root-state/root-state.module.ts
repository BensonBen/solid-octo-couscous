import { NgModule } from '@angular/core';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { entityConfig } from '../entity-metadata';
import { CurrentUserStoreModule } from './current-user/current-user.module';

@NgModule({
	imports: [
		EffectsModule.forRoot([]),
		EntityDataModule.forRoot(entityConfig),
		StoreModule.forRoot(
			{},
			{
				runtimeChecks: {
					strictStateSerializability: true,
					strictActionSerializability: true,
					strictStateImmutability: true,
					strictActionImmutability: true,
					strictActionWithinNgZone: true,
					strictActionTypeUniqueness: true,
				},
			}
		),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal,
		}),
		CurrentUserStoreModule,
	],
	declarations: [],
})
export class RootStoreModule {}
