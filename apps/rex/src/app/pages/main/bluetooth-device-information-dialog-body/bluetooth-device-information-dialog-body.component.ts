import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SchwinIc4BluetoothDeviceInformation } from '@solid-octo-couscous/model';

@Component({
	template: `
		<h1 mat-dialog-title>Connected Device Information</h1>
		<div mat-dialog-content>
			<ul class="no-dot">
				<li>Manufacturer: {{ schwinIc4DeviceInformation.manufacturerName ?? 'No Manufacturer.' }}</li>
				<li>Model: {{ schwinIc4DeviceInformation.modelNumber ?? 'No Model Number.' }}</li>
				<li>Hardware Revision: {{ schwinIc4DeviceInformation.hardwareRevision ?? 'No Hardware Revision.' }}</li>
				<li>Firmware Revision: {{ schwinIc4DeviceInformation.firmwareRevision ?? 'No Firmware Revision.' }}</li>
				<li>Software Revision: {{ schwinIc4DeviceInformation.softwareRevision ?? 'No Software Revision.' }}</li>
			</ul>
		</div>
		<mat-dialog-actions align="end">
			<button mat-stroked-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>ok</button>
		</mat-dialog-actions>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./bluetooth-device-information-dialog-body.component.scss'],
})
export class BluetoothDeviceInformationComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public schwinIc4DeviceInformation: SchwinIc4BluetoothDeviceInformation) {}
}
