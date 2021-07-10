import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	declarations: [MainComponent],
	imports: [
		CommonModule,
		MainRoutingModule,
		MatButtonModule,
		MatIconModule,
		MatTooltipModule,
		MatProgressSpinnerModule,
	],
})
export class MainModule {}
