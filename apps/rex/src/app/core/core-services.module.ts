import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BluetoothConnectionService } from './bluetooth-connection.service';
import { LoginService } from './login.service';

@NgModule({
	imports: [CommonModule],
	providers: [LoginService, BluetoothConnectionService],
})
export class CoreServicesModule {}
