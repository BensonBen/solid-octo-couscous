import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { BluetoothConnectionService } from './bluetooth-connection.service';
import { WorkoutService } from './workout.service';

@NgModule({
	imports: [CommonModule],
	providers: [AuthService, BluetoothConnectionService, WorkoutService],
})
export class CoreServicesModule {}
