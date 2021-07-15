import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
	selector: 'soc-main',
	templateUrl: './supporter.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./supporter.component.scss'],
})
export class SupporterComponent implements AfterViewInit {
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
