import { Injectable } from '@angular/core';
import { SchwinIc4BluetoothCharacteristics, SchwinIc4BluetoothServices } from '@solid-octo-couscous/model';
import { Observable, ReplaySubject } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';
import { BaseBluetoothConnectionService } from './base-bluetooth-connection.service';

declare const navigator: Navigator;

@Injectable()
export class SchwinIc4BluetoothConnectionService extends BaseBluetoothConnectionService {
	private readonly replay = 2;
	private readonly maxUnsignedSixteenBitInteger = 65536;
	public readonly wheelRevolutions$: ReplaySubject<number> = new ReplaySubject<number>(this.replay);
	public readonly lastWheelEventTime$: ReplaySubject<number> = new ReplaySubject<number>(this.replay);
	public readonly crankRevolutions$: ReplaySubject<number> = new ReplaySubject<number>(this.replay);
	public readonly lastCrankEventTime$: ReplaySubject<number> = new ReplaySubject<number>(this.replay);

	public readonly deltaWheelRevolution$: Observable<number>;
	public readonly deltaLastWheelEventTime$: Observable<number>;
	public readonly deltaCrankRevolution$: Observable<number>;
	public readonly deltaLastCrankEventTime$: Observable<number>;

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

		this.deltaWheelRevolution$ = this.wheelRevolutions$.pipe(
			pairwise(),
			map(([previous, current]) => {
				console.log(`previous: ${previous} current: ${current}`);
				if (previous < current) {
					return current - previous;
				} else if (previous > current) {
					return current + this.maxUnsignedSixteenBitInteger - previous;
				} else {
					return 0;
				}
			})
		);

		this.deltaLastWheelEventTime$ = this.lastWheelEventTime$.pipe(pairwise(), map(this.deltaUnsignedInteger));

		this.deltaCrankRevolution$ = this.crankRevolutions$.pipe(pairwise(), map(this.deltaUnsignedInteger));

		this.deltaLastCrankEventTime$ = this.lastCrankEventTime$.pipe(pairwise(), map(this.deltaUnsignedInteger));
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
		const littleEndian = true;
		// wheel revolutions.
		this.wheelRevolutions$.next(dataView.getUint32(1, littleEndian));
		// some time measurement.
		this.lastWheelEventTime$.next(dataView.getUint16(5, littleEndian));
		// amount of times the wheel went around.
		this.crankRevolutions$.next(dataView.getUint16(7, littleEndian));
		// some time measurment.
		this.lastCrankEventTime$.next(dataView.getUint16(9, littleEndian));
	};

	private readonly deltaUnsignedInteger = ([previous, current]) => {
		if (previous < current) {
			return current - previous;
		} else if (previous > current) {
			return current + this.maxUnsignedSixteenBitInteger - previous;
		} else {
			return 0;
		}
	};
}
