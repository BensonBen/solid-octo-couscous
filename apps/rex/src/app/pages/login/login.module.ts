import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-component/login-component.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [LoginComponent, AuthenticateComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		LoginRoutingModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatFormFieldModule,
		MatIconModule,
	],
	exports: [AuthenticateComponent],
})
export class LoginModule {}
