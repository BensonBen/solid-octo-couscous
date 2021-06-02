import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [MainComponent],
	imports: [CommonModule, MainRoutingModule, MatButtonModule, MatIconModule],
})
export class MainModule {}
