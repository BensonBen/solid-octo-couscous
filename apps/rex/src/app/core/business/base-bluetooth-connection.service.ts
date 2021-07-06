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
	protected readonly maxUnsignedSixteenBitInteger = 65536;
	protected readonly millisecondInSecond = 1000;
	protected readonly sixtySeconds = 60;
	protected readonly feetInMile = 5280;

	constructor(filters: Array<BluetoothRequestDeviceFilter>, optionalServices: Array<BluetoothServiceUUID>) {
		super();
		this.bluetoothDeviceSearchOptions = { ...this.bluetoothDeviceSearchOptions, filters, optionalServices };
	}
}
