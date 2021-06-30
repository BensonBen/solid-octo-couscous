import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Unsubscriber } from '@solid-octo-couscous/model';

@Injectable()
export class BaseBluetoothConnectionService extends Unsubscriber {
	protected readonly bluetoothDevice$: ReplaySubject<BluetoothDevice> = new ReplaySubject<BluetoothDevice>(1);
	protected readonly bluetoothServer$: ReplaySubject<BluetoothRemoteGATTServer> =
		new ReplaySubject<BluetoothRemoteGATTServer>(1);

	protected readonly bluetoothDeviceSearchOptions: RequestDeviceOptions = {
		filters: [],
	};

	constructor(filters: Array<BluetoothRequestDeviceFilter>, optionalServices: Array<BluetoothServiceUUID>) {
		super();
		this.bluetoothDeviceSearchOptions = { ...this.bluetoothDeviceSearchOptions, filters, optionalServices };
	}

	public readonly handleGenericCharacteristicNotification = event => {
		const { value } = event?.target;
		const dataView = value as DataView;
		console.log(`DataView buffer: ${dataView?.buffer}`);
		console.log(`DataView byteLength: ${dataView?.byteLength}`);
		console.log(`DataView byteOffset: ${dataView?.byteOffset}`);
	};
}
