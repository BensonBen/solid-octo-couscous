import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDrawerMode } from '@angular/material/sidenav';

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
}
