import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { provideMockStore } from '@ngrx/store/testing';
import { WorkoutService } from '../../../core';

import { LoginComponent } from './login-component.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	const animationService = {};
	const workoutService = {};

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [MatCardModule, ReactiveFormsModule],
				declarations: [LoginComponent],
				providers: [
					{
						provide: WorkoutService,
						useValue: workoutService,
					},
					provideMockStore({}),
				],
				schemas: [NO_ERRORS_SCHEMA],
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
