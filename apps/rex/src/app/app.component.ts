import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

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

	constructor(private readonly renderer: Renderer2) {}
}
