import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './business/auth.service';
import { BluetoothConnectionService } from './business/bluetooth-connection.service';
import { WorkoutService } from './business/workout.service';

@NgModule({
	imports: [CommonModule],
	providers: [AuthService, BluetoothConnectionService, WorkoutService],
})
export class CoreServicesModule {}
