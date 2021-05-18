import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthenticateComponent } from './authenticate.component';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationService } from '../services/animation.service';

describe('AuthenticateComponent', () => {
	let component: AuthenticateComponent;
	let fixture: ComponentFixture<AuthenticateComponent>;
	const animationService = {};
	const renderer = {};

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				schemas: [NO_ERRORS_SCHEMA],
				imports: [NoopAnimationsModule],
				declarations: [AuthenticateComponent],
				providers: [
					{
						provide: AnimationService,
						useValue: animationService,
					},
					{
						provide: Renderer2,
						useValue: renderer,
					},
				],
			})
				.compileComponents()
				.then(() => {
					fixture = TestBed.createComponent(AuthenticateComponent);
					component = fixture.componentInstance;
					fixture.detectChanges();
				});
		})
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
