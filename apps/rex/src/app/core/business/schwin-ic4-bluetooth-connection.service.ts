import { Injectable, Renderer2 } from '@angular/core';
import { SchwinIc4BluetoothCharacteristics, SchwinIc4BluetoothServices } from '@solid-octo-couscous/model';
import { BaseBluetoothConnectionService } from './base-bluetooth-connection.service';

declare const navigator: Navigator;

@Injectable()
export class SchwinIc4BluetoothConnectionService extends BaseBluetoothConnectionService {

	private readonly dataLogger: Array<string> = [];
	constructor(private readonly renderer: Renderer2) {
		super(
			[{ name: 'IC Bike' }],
			[
				SchwinIc4BluetoothServices.cyclingSpeedAndCadence,
				SchwinIc4BluetoothServices.deviceInformation,
				SchwinIc4BluetoothServices.fitnessMachine,
				SchwinIc4BluetoothServices.genericAccess,
				SchwinIc4BluetoothServices.heartRate,
			]
		);
	}

	public async connectToCyclingSpeedAndCadenceService(): Promise<void> {
		const primaryBluetoothServices = await this.connectToSchwinBike();
		const cyclingSpeedCadenceService = primaryBluetoothServices?.find(
			service => service.uuid === SchwinIc4BluetoothServices.cyclingSpeedAndCadenceUUID
		);
		const cscMeasurementChararacteristic: BluetoothRemoteGATTCharacteristic | undefined =
			await cyclingSpeedCadenceService?.getCharacteristic(
				// CSC Measurement feature. csc = cycling speed cadence.
				SchwinIc4BluetoothCharacteristics.cscMeasurement
			);

		const result: BluetoothRemoteGATTCharacteristic | undefined =
			await cscMeasurementChararacteristic?.startNotifications();
		result?.addEventListener('characteristicvaluechanged', this.parseCadenceWheelSpeedWheelTime);
	}

	private readonly connectToSchwinBike = async (): Promise<BluetoothRemoteGATTService[]> => {
		// TODO: add a check in here to notify the user if they're using a non-supported browser.
		const userSelectedSchwinIc4Bike: BluetoothDevice = await navigator.bluetooth.requestDevice(
			this.bluetoothDeviceSearchOptions
		);
		this.bluetoothDevice$.next(userSelectedSchwinIc4Bike);

		const serverConnection: BluetoothRemoteGATTServer | undefined =
			await userSelectedSchwinIc4Bike?.gatt?.connect();
		this.bluetoothServer$.next(serverConnection);

		return (await serverConnection?.getPrimaryServices()) ?? [];
	};

	private readonly parseCadenceWheelSpeedWheelTime = event => {
		const { value } = event?.target;
		const dataView = value as DataView;
		const view = new Uint8Array(dataView.buffer);
		this.dataLogger.push(this.toBinString(view))
		console.log(`some real data: ${dataView.getUint16(0, true)}`);
		console.log(`some other real data: ${dataView.getUint16(2, true)}`);
	};

	private readonly toBinString = (bytes) =>
		bytes.reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '');

	private saveFile(name, type, data): void {
		debugger;
		const element = this.renderer.createElement('a');
		this.renderer.setStyle(element, 'display', 'none');
		// element.attr 
		const url = window.URL.createObjectURL(new Blob([data], { type: type }));
		// a.attr("href", url);
		// a.attr("download", name);
		// $("body").append(a);
		// a[0].click();
		window.URL.revokeObjectURL(url);
		// a.remove();
	}

}
