import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { SchwinIc4BluetoothDeviceInformation, Unsubscriber } from '@solid-octo-couscous/model';
import { takeUntil } from 'rxjs/operators';
import { SchwinIc4BluetoothConnectionService } from '../../core';
import { BluetoothDeviceInformationComponent } from './bluetooth-device-information-dialog-body/bluetooth-device-information-dialog-body.component';

@Component({
	selector: 'soc-main',
	templateUrl: './main.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./main.component.scss'],
})
export class MainComponent extends Unsubscriber implements AfterViewInit, OnInit {
	@ViewChild(MatTooltip) private readonly bluetoothConnectionToolTip!: MatTooltip;

	public readonly spinnerMode: ProgressSpinnerMode = 'determinate';
	public readonly progressBarColor: ThemePalette = 'warn';

	private readonly matDialogConfig: MatDialogConfig<SchwinIc4BluetoothDeviceInformation> = {
		data: null,
	};

	constructor(
		public readonly schwinIc4BluetoothConnectionService: SchwinIc4BluetoothConnectionService,
		private readonly matDialog: MatDialog
	) {
		super();
	}

	public ngOnInit(): void {
		this.schwinIc4BluetoothConnectionService.deviceInformation$
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(deviceInformation => {
				this.matDialogConfig.data = deviceInformation;
				this.matDialog.open(BluetoothDeviceInformationComponent, this.matDialogConfig);
			});
	}

	public ngAfterViewInit(): void {
		// I hate doing this, but the event loop is it's own monster.
		// had this bug where the position of the tooltip wouldn't be in the right location.
		// it looked clunky.
		setTimeout(() => {
			this.bluetoothConnectionToolTip.hideDelay = 250;
			this.bluetoothConnectionToolTip.show(1000);
		}, 0);
	}

	public async connectToBluetoothDevice(): Promise<void> {
		await this.schwinIc4BluetoothConnectionService.connectToBluetoothDevice();
	}
}
