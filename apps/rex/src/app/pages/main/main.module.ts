import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [MainComponent],
	imports: [
		CommonModule,
		MainRoutingModule,
		MatButtonModule,
		MatIconModule,
		MatTableModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
	],
})
export class MainModule {}
