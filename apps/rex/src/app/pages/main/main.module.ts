import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BluetoothDeviceInformationComponent } from './bluetooth-device-information-dialog-body/bluetooth-device-information-dialog-body.component';

@NgModule({
	declarations: [MainComponent, BluetoothDeviceInformationComponent],
	imports: [
		CommonModule,
		MainRoutingModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatTooltipModule,
		MatDialogModule,
		MatProgressBarModule,
	],
})
export class MainModule {}
