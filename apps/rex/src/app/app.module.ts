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
import { RootStoreModule } from './root-state/root-state.module';
import { httpInterceptorProviders } from './interceptors';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { environment } from '../environments/environment';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const rexServiceWorkerOptions: SwRegistrationOptions = {
	enabled: environment.production,
	registrationStrategy: `registerWhenStable:5000`,
};

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		CoreServicesModule,
		MatSlideToggleModule,
		MatIconModule,
		MatToolbarModule,
		MatBadgeModule,
		MatButtonModule,
		MatSidenavModule,
		MatDividerModule,
		MatListModule,
		HttpClientModule,
		RootStoreModule,
		ServiceWorkerModule.register('ngsw-worker.js', rexServiceWorkerOptions),
	],
	providers: [httpInterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
