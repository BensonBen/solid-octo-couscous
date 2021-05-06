import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';
import { BluetoothConnectionService } from './bluetooth-connection.service';

@NgModule({
	imports: [CommonModule],
	providers: [AuthService, BluetoothConnectionService],
})
export class CoreServicesModule {}
