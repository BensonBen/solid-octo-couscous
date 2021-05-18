import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AnimationService } from '../services/animation.service';
import { provideMockStore } from '@ngrx/store/testing';

import { CreateComponentComponent } from './create-component.component';

describe('CreateComponentComponent', () => {
	let component: CreateComponentComponent;
	let fixture: ComponentFixture<CreateComponentComponent>;
	const animationService = {};

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [MatCardModule, ReactiveFormsModule],
				declarations: [CreateComponentComponent],
				providers: [
					{
						provide: AnimationService,
						useValue: animationService,
					},
					provideMockStore({}),
				],
				schemas: [NO_ERRORS_SCHEMA],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateComponentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
