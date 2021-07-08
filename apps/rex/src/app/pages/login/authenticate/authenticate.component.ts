import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AnimationService } from '../services/animation.service';
import { Platform } from '@angular/cdk/platform';

@Component({
	selector: 'soc-authenticate',
	templateUrl: './authenticate.component.html',
	styleUrls: ['./authenticate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticateComponent implements OnInit, OnDestroy {
	color: ThemePalette = 'warn';
	isLogin = true;
	toggleName: 'Login' | 'Create Account' = 'Create Account';
	isDarkMode = true;

	constructor(
		public readonly animationService: AnimationService,
		private readonly renderer: Renderer2,
		private readonly platform: Platform
	) {}

	ngOnInit(): void {
		// this is for animations smoothly moving accross the screen.
		this.renderer.setStyle(document.body, 'overflow', 'hidden');
	}

	ngOnDestroy(): void {
		// clean up after yourself.
		this.renderer.setStyle(document.body, 'overflow', 'auto');
	}

	changeThemes(): void {
		if (this.isDarkMode === true) {
			this.renderer.addClass(document.body, 'solid-octo-couscous-light-theme');
		} else {
			this.renderer.removeClass(document.body, 'solid-octo-couscous-light-theme');
		}

		this.isDarkMode = !this.isDarkMode;
	}
}
