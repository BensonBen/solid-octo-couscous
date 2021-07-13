import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
	selector: 'soc-main',
	templateUrl: './supported-equipment.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./supported-equipment.component.scss'],
})
export class SupportedEquipmentComponent implements AfterViewInit {
	durationInSeconds = 5;

	constructor(private readonly matSnackBar: MatSnackBar) {}

	openSnackBar() {
		const config: MatSnackBarConfig = {
			direction: 'rtl',
			horizontalPosition: 'right',
			verticalPosition: 'top',
			politeness: 'assertive',
			panelClass: '',
		};
		this.matSnackBar.open('Work in progress', 'ok', config);
	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			this.openSnackBar();
		}, 0);
	}
}
