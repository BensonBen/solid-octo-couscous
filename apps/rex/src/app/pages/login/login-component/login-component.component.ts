import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/auth.service';
import { WorkoutService } from '../../../core/workout.service';
import { AnimationService } from '../services/animation.service';

@Component({
	selector: 'solid-octo-couscous-login-component',
	templateUrl: './login-component.component.html',
	styleUrls: ['./login-component.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	matFormFieldAppearance: MatFormFieldAppearance = 'fill';

	private readonly minEmailLength: number = 1;
	private readonly minPasswordLength: number = 1;
	private readonly maxPasswordLength: number = 12;
	private readonly strongPasswordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?!.*(.)\1\1)[a-zA-Z0-9@]{6,12}$/;
	private readonly loginGroup: any = {
		loginName: [null, Validators.compose([Validators.required, Validators.minLength(this.minEmailLength)])],
		password: [
			null,
			Validators.compose([
				Validators.required,
				Validators.minLength(this.minPasswordLength),
				Validators.maxLength(this.maxPasswordLength),
				Validators.pattern(this.strongPasswordRegex),
			]),
		],
	};

	constructor(
		private readonly animationService: AnimationService,
		private readonly formBuilder: FormBuilder,
		private readonly matSnackBar: MatSnackBar,
		private readonly authService: AuthService,
		private readonly workoutService: WorkoutService
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group(this.loginGroup);
	}

	signIn(): void {
		const { value } = this.form;
		this.authService.loginWithEmailAndPassword(value ?? {}).subscribe(e => {
			this.matSnackBar.open('Logged In', 'gg', {
				horizontalPosition: 'center',
				verticalPosition: 'bottom',
			});
		});
	}

	goToCreateAccount(): void {
		this.animationService.toggleAnimationState();
	}

	getWorkout(): void {
		this.workoutService.getWorkout();
	}
}
