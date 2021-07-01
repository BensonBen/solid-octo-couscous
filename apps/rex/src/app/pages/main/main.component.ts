import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SchwinIc4BluetoothConnectionService } from '../../core';

@Component({
	selector: 'soc-main',
	templateUrl: './main.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
	constructor(private readonly schwinIc4BluetoothConnectionService: SchwinIc4BluetoothConnectionService) {}

	public async connectHeartRateDevice(event: Event): Promise<void> {
		await this.schwinIc4BluetoothConnectionService.connectToCyclingSpeedAndCadenceService();
	}

	public saveFile(): void {
		this.schwinIc4BluetoothConnectionService.saveFile();
	}
}
