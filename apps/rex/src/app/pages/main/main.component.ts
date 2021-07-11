import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SchwinIc4BluetoothConnectionService } from '../../core';
@Component({
	selector: 'soc-main',
	templateUrl: './main.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./main.component.scss'],
})
export class MainComponent {
	public readonly progressSpinnerColor: ThemePalette = 'primary';
	public readonly spinnerMode: ProgressSpinnerMode = 'determinate';
	constructor(public readonly schwinIc4BluetoothConnectionService: SchwinIc4BluetoothConnectionService) {}

	public async connectHeartRateDevice(event: Event): Promise<void> {
		await this.schwinIc4BluetoothConnectionService.connectToCyclingSpeedAndCadenceService();
	}
}
