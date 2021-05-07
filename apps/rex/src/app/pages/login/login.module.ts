import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponentComponent } from './create-component/create-component.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login-component/login-component.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AnimationService } from './services/animation.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [CreateComponentComponent, LoginComponent, AuthenticateComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		LoginRoutingModule,
		MatButtonModule,
		MatDatepickerModule,
		MatInputModule,
		MatCardModule,
		MatSelectModule,
		MatSnackBarModule,
		MatIconModule,
		MatNativeDateModule,
	],
	providers: [AnimationService],
})
export class LoginModule {}
