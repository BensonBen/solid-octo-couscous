import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../../core';
import { AuthService } from '../../../core/auth.service';

import { LoginComponent } from './login-component.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	const loginService = {};
	const authService = {};

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [MatCardModule, ReactiveFormsModule],
				declarations: [LoginComponent],
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
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
