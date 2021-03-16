import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { CredentialsComponent } from './pages/authenticate/credentials/credentials.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreServicesModule } from './core/core-services.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [AppComponent, AuthenticateComponent, CredentialsComponent],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		CoreServicesModule,
		EffectsModule.forRoot([]),
		EntityDataModule.forRoot(entityConfig),
		StoreRouterConnectingModule.forRoot(),
		MatSlideToggleModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatSelectModule,
		MatIconModule,
		MatToolbarModule,
		StoreRouterConnectingModule.forRoot(),
		StoreModule.forRoot({}, {}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		HttpClientModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
