import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthenticateComponent } from './authenticate.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../../../core';

describe('AuthenticateComponent', () => {
	let component: AuthenticateComponent;
	let fixture: ComponentFixture<AuthenticateComponent>;

	const loginService = {};

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [NoopAnimationsModule],
			declarations: [AuthenticateComponent],
			providers: [{
				provide: LoginService,
				useValue: loginService,
			},]
		}).compileComponents().then(() => {
			fixture = TestBed.createComponent(AuthenticateComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
