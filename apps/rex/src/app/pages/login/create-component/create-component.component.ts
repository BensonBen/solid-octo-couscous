import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { isNil as _isNil } from 'lodash-es';
import { AuthService } from '../../../core';
import { AnimationService } from '../services/animation.service';

@Component({
	selector: 'solid-octo-couscous-create-component',
	templateUrl: './create-component.component.html',
	styleUrls: ['./create-component.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponentComponent implements OnInit {
	form: FormGroup;
	matFormFieldAppearance: MatFormFieldAppearance = 'fill';

	private readonly minEmailLength: number = 1;
	private readonly minPasswordLength: number = 1;
	private readonly maxPasswordLength: number = 12;
	private readonly strongPasswordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?!.*(.)\1\1)[a-zA-Z0-9@]{6,12}$/;
	private readonly createGroup: any = {
		loginName: [null, Validators.compose([Validators.required, Validators.minLength(0)])],
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
		retypedPassword: [
			null,
			Validators.compose([
				Validators.required,
				Validators.minLength(this.minPasswordLength),
				Validators.maxLength(this.maxPasswordLength),
				Validators.pattern(this.strongPasswordRegex),
			]),
		],
		dateOfBirth: [null, Validators.compose([Validators.required])],
	};

	constructor(
		private readonly authService: AuthService,
		private readonly formBuilder: FormBuilder,
		private readonly animationService: AnimationService
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group(this.createGroup, {
			validators: this.checkPasswords,
		});
	}

	readonly checkPasswords = (group: FormGroup): { [key: string]: any } | null => {
		const pass: string = group?.get('password')?.value ?? null;
		const confirmPass: string = group?.get('retypedPassword')?.value ?? null;

		if (!_isNil(pass) && !_isNil(confirmPass)) {
			return pass === confirmPass ? null : { notSame: true };
		}

		return { notSame: true };
	};

	createAccount(): void {
		const { email, password, dateOfBirth, loginName } = this.form.value;
		this.authService
			.createAccount({
				email,
				password,
				dateOfBirth: (dateOfBirth as Date)?.getTime(),
				loginName,
			})
			.subscribe(e => console.log(e));
	}

	goToLogin(): void {
		this.animationService.toggleAnimationState();
	}
}
