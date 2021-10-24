import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './business/auth.service';
import { SchwinIc4BluetoothConnectionService } from './business/schwin-ic4-bluetooth-connection.service';
import { WorkoutService } from './business/workout.service';
import { LoggedInGuard } from './logged-in.guard';

@NgModule({
	imports: [CommonModule],
	providers: [AuthService, LoggedInGuard, SchwinIc4BluetoothConnectionService, WorkoutService],
})
export class CoreServicesModule {}
