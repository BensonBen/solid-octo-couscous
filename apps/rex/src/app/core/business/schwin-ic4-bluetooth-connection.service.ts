import { Injectable } from '@angular/core';
import {
	SchwinIc4BluetoothCharacteristics,
	SchwinIc4BluetoothDeviceInformation,
	SchwinIc4BluetoothServices,
} from '@solid-octo-couscous/model';
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
	public readonly deviceInformation$: Subject<SchwinIc4BluetoothDeviceInformation | undefined> = new Subject<
		SchwinIc4BluetoothDeviceInformation | undefined
	>();

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

	public async connectToBluetoothDevice(): Promise<void> {
		// gatt server and primary services.
		const bluetoothRemoteGattServer = await this.connectToSchwinBikeGattServer();
		const primaryBluetoothServices = await bluetoothRemoteGattServer?.getPrimaryServices();

		// services.
		const deviceInformationService = primaryBluetoothServices?.find(
			service => service.uuid === SchwinIc4BluetoothServices.deviceInformationUUID
		);
		const cyclingSpeedCadenceService = primaryBluetoothServices?.find(
			service => service.uuid === SchwinIc4BluetoothServices.cyclingSpeedAndCadenceUUID
		);

		const cscMeasurement = await cyclingSpeedCadenceService?.getCharacteristic(
			SchwinIc4BluetoothCharacteristics.cscMeasurement
		);

		const stupid = await this.collectBikeInformation(deviceInformationService);
		this.deviceInformation$.next(stupid);

		const result: BluetoothRemoteGATTCharacteristic | undefined = await cscMeasurement?.startNotifications();
		result?.addEventListener('characteristicvaluechanged', this.parseCadenceWheelSpeedWheelTime);
	}

	private readonly connectToSchwinBikeGattServer = async (): Promise<BluetoothRemoteGATTServer | undefined> => {
		const userSelectedSchwinIc4Bike = await navigator.bluetooth.requestDevice(this.bluetoothDeviceSearchOptions);
		return await userSelectedSchwinIc4Bike?.gatt?.connect();
	};

	private readonly parseCadenceWheelSpeedWheelTime = (event: Event) => {
		// something funky is going on here with typing and how it lines up with chrome.
		const { value: dataView } = event?.target as unknown as { value: DataView };
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

	private readonly collectBikeInformation = async (
		gattServiceForBikeInfo: BluetoothRemoteGATTService | undefined
	): Promise<SchwinIc4BluetoothDeviceInformation> => {
		// characteristics.
		const [manufacturerName, modelNumber, hardwareRev, firmwareRev, softwareRev] = await Promise.all([
			gattServiceForBikeInfo?.getCharacteristic(SchwinIc4BluetoothCharacteristics.manufacturerName),
			gattServiceForBikeInfo?.getCharacteristic(SchwinIc4BluetoothCharacteristics.modelNumber),
			gattServiceForBikeInfo?.getCharacteristic(SchwinIc4BluetoothCharacteristics.hardwareRevision),
			gattServiceForBikeInfo?.getCharacteristic(SchwinIc4BluetoothCharacteristics.firmwareRevision),
			gattServiceForBikeInfo?.getCharacteristic(SchwinIc4BluetoothCharacteristics.softwareRevision),
			gattServiceForBikeInfo?.getCharacteristic(SchwinIc4BluetoothCharacteristics.pnpId),
		]);

		// values of characteristics.
		const [nameDataView, modelDataView, hardwareRevDataView, firmwareRevDataView, softwareRevDataView] =
			await Promise.all([
				manufacturerName?.readValue(),
				modelNumber?.readValue(),
				hardwareRev?.readValue(),
				firmwareRev?.readValue(),
				softwareRev?.readValue(),
			]);

		return {
			firmwareRevision: this.parseUnsignedIntegersToAsciiEncodedString(firmwareRevDataView),
			softwareRevision: this.parseUnsignedIntegersToAsciiEncodedString(softwareRevDataView),
			hardwareRevision: this.parseUnsignedIntegersToAsciiEncodedString(hardwareRevDataView),
			manufacturerName: this.parseUnsignedIntegersToAsciiEncodedString(nameDataView),
			modelNumber: this.parseUnsignedIntegersToAsciiEncodedString(modelDataView),
		} as SchwinIc4BluetoothDeviceInformation;
	};
}
