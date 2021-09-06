import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SupportedEquipmentRoutingModule } from './supported-equipment-routing.module';
import { SupportedEquipmentComponent } from './supported-equipment.component';

@NgModule({
	declarations: [SupportedEquipmentComponent],
	imports: [CommonModule, SupportedEquipmentRoutingModule, MatSnackBarModule],
})
export class SupportedEquipmentModule {}
