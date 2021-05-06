import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AuthService } from '../../../core/auth.service';
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
		email: [
			null,
			Validators.compose([Validators.required, Validators.email, Validators.minLength(this.minEmailLength)]),
		],
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
		private readonly authService: AuthService) { }

	ngOnInit(): void {
		this.form = this.formBuilder.group(this.loginGroup);
	}

	signIn(): void {
		const { email, password } = this.form.value;
		// this.authService.loginWithEmailAndPassword(email, password);
		// TODO: implement the above method;
		console.log('future implementation');
	}

	goToCreateAccount(): void {
		this.animationService.toggleAnimationState();
	}
}
