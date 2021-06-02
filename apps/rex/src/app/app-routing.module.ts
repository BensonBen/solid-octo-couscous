import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticateComponent } from './pages/login/authenticate/authenticate.component';
import { LoginModule } from './pages/login/login.module';

const routes: Routes = [
	{ path: '', redirectTo: 'auth', pathMatch: 'full' },
	// not lazily loaded because this will be required for every single login.
	{
		path: 'auth',
		component: AuthenticateComponent,
	},
	{
		path: 'main',
		loadChildren: () => import('./pages/main/main.module').then(mod => mod.MainModule),
	},
	{ path: '**', redirectTo: 'auth' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes), LoginModule],
	exports: [RouterModule],
})
export class AppRoutingModule {}
