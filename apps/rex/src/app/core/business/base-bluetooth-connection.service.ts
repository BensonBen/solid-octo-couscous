import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Unsubscriber } from '@solid-octo-couscous/model';
import { bgRed } from 'chalk';
import { isNil as _isNil } from 'lodash-es';

@Injectable()
export class BaseBluetoothConnectionService extends Unsubscriber {
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

	protected readonly parseUnsignedIntegersToAsciiEncodedString = (dataView: DataView | undefined): string => {
		if (!_isNil(dataView)) {
			const result: Array<number> = [];
			for (let i = 0; i < (dataView as DataView).byteLength; i++) {
				result.push((dataView as DataView).getUint8(i));
			}
			return String.fromCharCode(...(result ?? []));
		} else {
			console.log(bgRed('whoops, looks like something went awry when parsing unsigned integers.'));
			return '';
		}
	};

	protected readonly deltaUnsignedInteger = ([previous, current]: [number, number]) => {
		if (previous < current) {
			return current - previous;
		} else if (previous > current) {
			return current + this.maxUnsignedSixteenBitInteger - previous;
		} else {
			return 0;
		}
	};

	/**
	 * https://www.bluetooth.com/wp-content/uploads/Sitecore-Media-Library/Gatt/Xml/Characteristics/org.bluetooth.characteristic.pnp_id.xml.
	 *
	 * @param dataView, the raw binary from the device containing pnp id info.
	 * @returns, an array of length 4 with the parsed pnp id's from bluetooths standard spec.
	 */
	protected readonly parsePnpId = (dataView: DataView | undefined): Array<number> => {
		if (!_isNil(dataView)) {
			const rawUnsigned: Array<number> = [];
			// Vendor ID Source: according to spec it should be an unsigned 8 bit integer.
			rawUnsigned.push((dataView as DataView).getUint8(0));
			// Vendor ID: according to spec it should be an unsigned 16 bit integer.
			rawUnsigned.push((dataView as DataView).getUint16(1, true));
			// Product ID: according to spec it should be an unsigned 16 bit integer.
			rawUnsigned.push((dataView as DataView).getUint16(3, true));
			// Product Version: according to spec it should be an unsinged 16 bit integer.
			rawUnsigned.push((dataView as DataView).getUint16(5, true));
			return rawUnsigned;
		} else {
			console.log(bgRed('whoops, looks like something went awry when parsing unsigned integers.'));
			return [0, 0, 0, 0];
		}
	};
}
