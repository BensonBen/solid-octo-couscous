import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
	selector: 'solid-octo-couscous-main',
	template: `<h2>hey bik boi</h2>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
	ngOnInit(): void {
		console.log('I am here');
	}
}
