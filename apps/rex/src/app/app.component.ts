import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

declare const window: Window;

@Component({
	selector: 'soc-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	color: ThemePalette = 'warn';
	isLogin = true;
	toggleName: 'Login' | 'Create Account' = 'Create Account';
	isDarkMode = true;
	title = 'rex';
	matDrawerMode: MatDrawerMode = 'over';

	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly matNotification: MatSnackBar
	) {}

	public github(event: Event): void {
		event.preventDefault();
		window.open('https://github.com/BensonBen/solid-octo-couscous', '_blank');
	}

	public main(event: Event): void {
		event.preventDefault();
		this.router.navigate(['main'], { relativeTo: this.activatedRoute });
	}

	public supporter(event: Event): void {
		event.preventDefault();
		this.router.navigate(['supporter'], { relativeTo: this.activatedRoute });
	}

	public supportedEquipment(event: Event): void {
		event.preventDefault();
		this.router.navigate(['supported-equipment'], { relativeTo: this.activatedRoute });
	}

	public displayNotification(): void {
		this.matNotification.open('hello!', 'dismiss', {
			announcementMessage: 'hello!',
			data: {
				praise: 'praise the datum',
			},
			panelClass: ['primary-toast-message'],
			direction: 'ltr',
			duration: 5000,
			horizontalPosition: 'center',
			politeness: 'assertive',
		});
	}
}
