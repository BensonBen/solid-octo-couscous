import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SupporterRoutingModule } from './supporter-routing.module';
import { SupporterComponent } from './supporter.component';

@NgModule({
	declarations: [SupporterComponent],
	imports: [CommonModule, SupporterRoutingModule, MatSnackBarModule],
})
export class SupporterModule {}
