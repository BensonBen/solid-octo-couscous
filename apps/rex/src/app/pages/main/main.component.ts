import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { SchwinIc4BluetoothConnectionService } from '../../core';

@Component({
	selector: 'solid-octo-couscous-main',
	templateUrl: './main.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
	constructor(private readonly schwinIc4BluetoothConnectionService: SchwinIc4BluetoothConnectionService) {}

	public async connectHeartRateDevice(event: Event): Promise<void> {
		await this.schwinIc4BluetoothConnectionService.connectToCyclingSpeedAndCadenceService();
	}
}
