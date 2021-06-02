import { Injectable } from '@angular/core';
import { SchwinIc4BluetoothCharacteristics, SchwinIc4BluetoothServices } from '@solid-octo-couscous/model';
import { BaseBluetoothConnectionService } from './base-bluetooth-connection.service';

declare const navigator: Navigator;

@Injectable()
export class SchwinIc4BluetoothConnectionService extends BaseBluetoothConnectionService {
	constructor() {
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
		const cscMeasurementChararacteristic:
			| BluetoothRemoteGATTCharacteristic
			| undefined = await cyclingSpeedCadenceService?.getCharacteristic(
			// CSC Measurement feature. csc = cycling speed cadence.
			SchwinIc4BluetoothCharacteristics.cscMeasurement
		);

		const result:
			| BluetoothRemoteGATTCharacteristic
			| undefined = await cscMeasurementChararacteristic?.startNotifications();
		result?.addEventListener('characteristicvaluechanged', this.parseCadenceWheelSpeedWheelTime);
	}

	private readonly connectToSchwinBike = async (): Promise<BluetoothRemoteGATTService[]> => {
		// TODO: add a check in here to notify the user if they're using a non-supported browser.
		const userSelectedSchwinIc4Bike: BluetoothDevice = await navigator.bluetooth.requestDevice(
			this.bluetoothDeviceSearchOptions
		);
		this.bluetoothDevice$.next(userSelectedSchwinIc4Bike);

		const serverConnection:
			| BluetoothRemoteGATTServer
			| undefined = await userSelectedSchwinIc4Bike?.gatt?.connect();
		this.bluetoothServer$.next(serverConnection);

		return (await serverConnection?.getPrimaryServices()) ?? [];
	};

	private readonly parseCadenceWheelSpeedWheelTime = event => {
		const { value } = event?.target;
		const dataView = value as DataView;
		console.log(`some real data: ${dataView.getUint16(0, true)}`);
		console.log(`some other real data: ${dataView.getUint16(2, true)}`);
	};
}
