import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-component/login-component.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimationService } from './services/animation.service';

@NgModule({
	declarations: [LoginComponent, AuthenticateComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		LoginRoutingModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatSelectModule,
		MatFormFieldModule,
		MatIconModule,
	],
	providers: [AnimationService],
	exports: [AuthenticateComponent],
})
export class LoginModule {}
