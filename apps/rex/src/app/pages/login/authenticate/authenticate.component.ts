import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { ThemePalette } from '@angular/material/core';
import { AnimationService } from '../services/animation.service';

@Component({
	selector: 'soc-authenticate',
	templateUrl: './authenticate.component.html',
	styleUrls: ['./authenticate.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('login', [
			transition(':enter', [
				style({ position: 'absolute' }),
				animate(
					'250ms cubic-bezier(0.86, 0, 0.07, 1)',
					keyframes([
						style({
							opacity: 0,
							transform: 'translate3d(-100vw, 0, 0)',
							offset: 0,
						}),
						style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1 }),
					])
				),
			]),
			transition(':leave', [
				style({ position: 'absolute' }),
				animate(
					'250ms cubic-bezier(0.86, 0, 0.07, 1)',
					keyframes([
						style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0 }),
						style({
							opacity: 0,
							transform: 'translate3d(-100vw, 0, 0)',
							offset: 1,
						}),
					])
				),
			]),
		]),
		trigger('create', [
			transition(':enter', [
				style({ position: 'absolute' }),
				animate(
					'250ms cubic-bezier(0.86, 0, 0.07, 1)',
					keyframes([
						style({
							opacity: 0,
							transform: 'translate3d(100vw, 0, 0)',
							offset: 0,
						}),
						style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1 }),
					])
				),
			]),
			transition(':leave', [
				style({ position: 'absolute' }),
				animate(
					'250ms cubic-bezier(0.86, 0, 0.07, 1)',
					keyframes([
						style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 0 }),
						style({
							opacity: 0,
							transform: 'translate3d(100vw, 0, 0)',
							offset: 1,
						}),
					])
				),
			]),
		]),
	],
})
export class AuthenticateComponent implements OnInit, OnDestroy {
	color: ThemePalette = 'warn';
	isLogin = true;
	toggleName: 'Login' | 'Create Account' = 'Create Account';
	isDarkMode = true;

	constructor(public readonly animationService: AnimationService, private readonly renderer: Renderer2) {}

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
