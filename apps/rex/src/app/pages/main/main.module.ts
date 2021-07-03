import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
	declarations: [MainComponent],
	imports: [CommonModule, MainRoutingModule, MatButtonModule, MatIconModule, MatTableModule],
})
export class MainModule {}
