import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

declare const navigator: Navigator;

interface BluetoothDevice {
	gatt: any;
	id: string;
	name: string;
	ongattserverdisconnected: () => void;
}

@Injectable()
export class BluetoothConnectionService {
	public readonly bluetoothDevice$: ReplaySubject<BluetoothDevice | unknown> = new ReplaySubject<
		BluetoothDevice | unknown
	>(1);

	public async reachAvailibleDevices(): Promise<void> {
		const bluetoothDevice: BluetoothDevice = await (navigator as any).bluetooth.requestDevice({
			acceptAllDevices: true,
		});
		this.bluetoothDevice$.next(
			bluetoothDevice || { gatt: null, id: null, name: null, ongattserverdisconnected: null }
		);
	}
}
