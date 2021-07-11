import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoginComponent } from './login-component/login-component.component';

const routes: Routes = [
	{
		path: '',
		component: AuthenticateComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full',
			},
			{
				path: 'login',
				component: LoginComponent,
			},
			{
				path: 'createAccount',
				loadChildren: () =>
					import('./create-component/create-account.module').then(mod => mod.CreateAccountModule),
			},
		],
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule {}
