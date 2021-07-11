import { Injectable } from '@angular/core';
import { SchwinIc4BluetoothCharacteristics, SchwinIc4BluetoothServices } from '@solid-octo-couscous/model';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';
import { BaseBluetoothConnectionService } from './base-bluetooth-connection.service';

declare const navigator: Navigator;

@Injectable()
export class SchwinIc4BluetoothConnectionService extends BaseBluetoothConnectionService {
	private readonly replay = 2;
	private readonly schwinIc4WheelCircumferenceInInches = 5;
	// should be 1056.
	private readonly revolutionsRequiredPerMile = this.feetInMile / this.schwinIc4WheelCircumferenceInInches;
	public readonly wheelRevolutions$: ReplaySubject<number> = new ReplaySubject<number>(this.replay);
	public readonly lastWheelEventTime$: ReplaySubject<number> = new ReplaySubject<number>(this.replay);
	public readonly crankRevolutions$: ReplaySubject<number> = new ReplaySubject<number>(this.replay);
	public readonly lastCrankEventTime$: ReplaySubject<number> = new ReplaySubject<number>(this.replay);

	public readonly deltaWheelRevolution$: Observable<number>;
	public readonly deltaLastWheelEventTime$: Observable<number>;
	public readonly deltaCrankRevolution$: Observable<number>;
	public readonly deltaLastCrankEventTime$: Observable<number>;

	public readonly mph$: Observable<number>;
	public readonly kph$: Observable<number>;

	public readonly deviceName$: Subject<string>;

	constructor() {
		super(
			[{ name: 'IC Bike' }],
			[
				SchwinIc4BluetoothServices.cyclingSpeedAndCadence,
				SchwinIc4BluetoothServices.deviceInformation,
				SchwinIc4BluetoothServices.fitnessMachine,
				SchwinIc4BluetoothServices.heartRate,
			]
		);

		this.deltaWheelRevolution$ = this.wheelRevolutions$.pipe(pairwise(), map(this.deltaUnsignedInteger));
		this.deltaLastWheelEventTime$ = this.lastWheelEventTime$.pipe(pairwise(), map(this.deltaUnsignedInteger));
		this.deltaCrankRevolution$ = this.crankRevolutions$.pipe(pairwise(), map(this.deltaUnsignedInteger));
		this.deltaLastCrankEventTime$ = this.lastCrankEventTime$.pipe(pairwise(), map(this.deltaUnsignedInteger));

		this.mph$ = combineLatest([this.deltaLastWheelEventTime$, this.deltaWheelRevolution$]).pipe(
			map(this.calculateMphGivenDeltaWheelTimeAndDeltaRevolutions)
		);
		this.kph$ = this.mph$.pipe(map(v => v * 1.6));
	}

	public async connectToCyclingSpeedAndCadenceService(): Promise<void> {
		// bluetooth connection to schwinn server.
		const bluetoothRemoteGattServer = await this.connectToSchwinBike();
		const primaryBluetoothServices = await bluetoothRemoteGattServer?.getPrimaryServices();
		const derp = await bluetoothRemoteGattServer?.getPrimaryService(SchwinIc4BluetoothServices.deviceInformation);
		const characteristic = await derp?.getCharacteristic(SchwinIc4BluetoothCharacteristics.manufacturerNameString);
		const deviceNameDataView = await characteristic?.readValue();
		this.parseDeviceName(deviceNameDataView);

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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		result?.addEventListener('characteristicvaluechanged', this.parseCadenceWheelSpeedWheelTime as any);
	}

	private readonly connectToSchwinBike = async (): Promise<BluetoothRemoteGATTServer | undefined> => {
		const userSelectedSchwinIc4Bike = await navigator.bluetooth.requestDevice(this.bluetoothDeviceSearchOptions);

		return await userSelectedSchwinIc4Bike?.gatt?.connect();
	};

	private readonly parseDeviceName = (dataViewContainingDeviceName: DataView | undefined) => {
		// 0x007402020000;
		const a = dataViewContainingDeviceName?.getUint8(0) ?? 0;
		const b = dataViewContainingDeviceName?.getUint8(1) ?? 0;
		const c = dataViewContainingDeviceName?.getUint8(2) ?? 0;
		const firstPart = dataViewContainingDeviceName?.getUint8(3) ?? 0;
		const secondPart = dataViewContainingDeviceName?.getUint8(4) ?? 0;
		const thirdPart = dataViewContainingDeviceName?.getUint8(5) ?? 0;
		const fourthPart = dataViewContainingDeviceName?.getUint8(6) ?? 0;
		const fifthPart = dataViewContainingDeviceName?.getUint8(7) ?? 0;
		const sixthPart = dataViewContainingDeviceName?.getUint8(8) ?? 0;
		const d = dataViewContainingDeviceName?.getUint8(9) ?? 0;
		const e = dataViewContainingDeviceName?.getUint8(10) ?? 0;
		const f = dataViewContainingDeviceName?.getUint8(11) ?? 0;
		const g = dataViewContainingDeviceName?.getUint8(12) ?? 0;

		console.log(
			String.fromCharCode(a, b, c, firstPart, secondPart, thirdPart, fourthPart, fifthPart, sixthPart, d, e, f, g)
		);
	};

	private readonly parseCadenceWheelSpeedWheelTime = (event: { target: { value: DataView } }) => {
		const { value: dataView } = event?.target;
		const littleEndian = true;
		// wheel revolutions in unsigned 16 bit numbers.
		this.wheelRevolutions$.next(dataView.getUint32(1, littleEndian));
		// last wheel event time in unsigned 16 bit numbers.
		this.lastWheelEventTime$.next(dataView.getUint16(5, littleEndian));
		// amount of times the wheel went around in unsigned 16 bit numbers.
		this.crankRevolutions$.next(dataView.getUint16(7, littleEndian));
		// last crank event time in unsigned 16 bit numbers.
		this.lastCrankEventTime$.next(dataView.getUint16(9, littleEndian));
	};

	private readonly deltaUnsignedInteger = ([previous, current]: [number, number]) => {
		if (previous < current) {
			return current - previous;
		} else if (previous > current) {
			return current + this.maxUnsignedSixteenBitInteger - previous;
		} else {
			return 0;
		}
	};

	/**
	 * Doesn't currenlty work and doing some more things for this function.
	 *
	 * @param Array containing delta wheel time and wheel revolutions
	 * @returns, miles per hour given certain bike parameters at a given time.
	 */
	private readonly calculateMphGivenDeltaWheelTimeAndDeltaRevolutions = ([
		deltaWheelTime,
		deltaWheelRevolutions,
	]: Array<number>): number => {
		let result = 0;
		if (deltaWheelTime < this.millisecondInSecond) {
			const normalizeForSecondsCuzItsInMilliseconds = deltaWheelTime / this.millisecondInSecond;
			const rps = deltaWheelRevolutions / normalizeForSecondsCuzItsInMilliseconds;
			const rpm = rps * this.sixtySeconds;
			result = rpm;
		} else if (deltaWheelTime > this.millisecondInSecond) {
			result = 0;
		} else {
			result = 0;
		}
		return result;
	};
}
