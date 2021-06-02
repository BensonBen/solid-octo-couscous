import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseBluetoothConnectionService } from './base-bluetooth-connection.service';
import { SchwinIc4BluetoothConnectionService } from './schwin-ic4-bluetooth-connection.service';
import { LoginService } from './login.service';

@NgModule({
	imports: [CommonModule],
	providers: [BaseBluetoothConnectionService, LoginService, SchwinIc4BluetoothConnectionService],
})
export class CoreServicesModule {}
