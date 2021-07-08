import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CoreServicesModule } from './core/core-services.module';
import { AppRoutingModule } from './app-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { RootStoreModule } from './root-state/root-state.module';
import { httpInterceptorProviders } from './interceptors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { environment } from '../environments/environment';

const rexServiceWorkerOptions: SwRegistrationOptions = {
	enabled: environment.production,
	registrationStrategy: `registerWithDelay:5000`,
	scope: `./`,
};

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		CoreServicesModule,
		MatSlideToggleModule,
		MatIconModule,
		MatToolbarModule,
		MatBadgeModule,
		MatButtonModule,
		MatGridListModule,
		MatSidenavModule,
		HttpClientModule,
		RootStoreModule,
		ServiceWorkerModule.register('ngsw-worker.js', rexServiceWorkerOptions),
	],
	providers: [httpInterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
