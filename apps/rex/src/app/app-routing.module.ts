import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'auth', pathMatch: 'full' },
	{
		path: 'auth',
		loadChildren: () => import('./pages/login/login.module').then(mod => mod.LoginModule),
	},
	{
		path: 'main',
		loadChildren: () => import('./pages/main/main.module').then(mod => mod.MainModule),
	},
	{ path: '**', redirectTo: 'auth' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
