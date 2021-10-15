import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface BluetoothState {
	bluetoothServer: BluetoothRemoteGATTServer;
}

declare const navigator: Navigator;

@Injectable()
export class BluetoothStateStore extends ComponentStore<BluetoothState> {
	constructor() {
		super({ bluetoothServer: null });
	}
}
