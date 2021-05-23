import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'soc-main',
	template: `<h2>hey bik boi</h2>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
