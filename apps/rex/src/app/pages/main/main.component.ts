import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { SchwinIc4BluetoothConnectionService } from '../../core';

@Component({
	selector: 'soc-main',
	templateUrl: './main.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit {
	@ViewChild(MatTooltip) private readonly bluetoothConnectionToolTip!: MatTooltip;

	public readonly progressSpinnerColor: ThemePalette = 'primary';
	public readonly spinnerMode: ProgressSpinnerMode = 'determinate';
	constructor(public readonly schwinIc4BluetoothConnectionService: SchwinIc4BluetoothConnectionService) {}

	public ngAfterViewInit(): void {
		this.bluetoothConnectionToolTip.hideDelay = 250;
		this.bluetoothConnectionToolTip.show(1000);
	}

	public async connectHeartRateDevice(): Promise<void> {
		await this.schwinIc4BluetoothConnectionService.connectToCyclingSpeedAndCadenceService();
	}
}
