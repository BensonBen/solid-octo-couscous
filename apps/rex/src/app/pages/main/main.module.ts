import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
	declarations: [MainComponent],
	imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
