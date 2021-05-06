import { ChangeDetectionStrategy, Component, HostListener, Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

declare const window: Window;

@Component({
	selector: 'solid-octo-couscous-root',
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
	screenHeight: number = window.innerHeight / 3;

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		this.screenHeight = window.innerHeight / 3;
	}

	constructor(private readonly renderer: Renderer2) { }

	changeThemes(): void {
		if (this.isDarkMode === true) {
			this.renderer.addClass(document.body, 'solid-octo-couscous-light-theme');
		} else {
			this.renderer.removeClass(document.body, 'solid-octo-couscous-light-theme');
		}

		this.isDarkMode = !this.isDarkMode;
	}
}
