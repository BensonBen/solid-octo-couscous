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
		(navigator as any).bluetooth
			.requestDevice({ filters: [{ services: ['heart_rate'] }] })
			.then(device => device.gatt.connect())
			.then(server => server.getPrimaryService('heart_rate'))
			.then(service => service.getCharacteristic('heart_rate_measurement'))
			.then(characteristic => characteristic.startNotifications())
			.then(characteristic => {
				characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
				console.log('Notifications have been started.');
			})
			.catch(error => {
				console.error(error);
			});

		function handleCharacteristicValueChanged(event) {
			const value = event.target.value;
			console.log(`Received ${value}`);
			// TODO: Parse Heart Rate Measurement value.
			// See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
		}
	}
}
