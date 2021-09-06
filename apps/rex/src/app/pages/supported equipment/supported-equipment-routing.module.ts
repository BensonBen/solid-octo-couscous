import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupportedEquipmentComponent } from './supported-equipment.component';

const routes: Routes = [
	{
		path: '',
		component: SupportedEquipmentComponent,
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SupportedEquipmentRoutingModule {}
