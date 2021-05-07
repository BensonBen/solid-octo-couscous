import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../../core';
import { AuthService } from '../../../core/auth.service';

import { CreateComponentComponent } from './create-component.component';

describe('CreateComponentComponent', () => {
	let component: CreateComponentComponent;
	let fixture: ComponentFixture<CreateComponentComponent>;
	const loginService = {};
	const authService = {};

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [MatCardModule, ReactiveFormsModule],
				declarations: [CreateComponentComponent],
				providers: [
					{
						provide: LoginService,
						useValue: loginService,
					},
					{
						provide: AuthService,
						useValue: authService,
					},
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
