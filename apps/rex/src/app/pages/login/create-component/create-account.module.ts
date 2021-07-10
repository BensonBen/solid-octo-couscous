import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponentComponent } from './create-component.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
	declarations: [CreateComponentComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		CreateAccountRoutingModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatFormFieldModule,
		MatIconModule,
		MatDatepickerModule,
		MatNativeDateModule,
	],
})
export class CreateAccountModule {}
