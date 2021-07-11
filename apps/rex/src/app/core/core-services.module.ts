import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './business/auth.service';
import { BluetoothConnectionService } from './business/bluetooth-connection.service';
import { SchwinIc4BluetoothConnectionService } from './business/schwin-ic4-bluetooth-connection.service';
import { WorkoutService } from './business/workout.service';

@NgModule({
	imports: [CommonModule],
	providers: [AuthService, BluetoothConnectionService, SchwinIc4BluetoothConnectionService, WorkoutService],
})
export class CoreServicesModule {}
