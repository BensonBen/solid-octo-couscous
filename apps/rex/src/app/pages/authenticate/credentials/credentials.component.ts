import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { LoginService } from '../../../core/login.service';

@Component({
	selector: 'solid-octo-couscous-credentials',
	templateUrl: './credentials.component.html',
	styleUrls: ['./credentials.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsComponent implements OnInit {
	@Input() isLogin = true;

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

	private readonly createGroup: any = {
		...this.loginGroup,
		retypedPassword: [
			null,
			Validators.compose([
				Validators.required,
				Validators.minLength(this.minPasswordLength),
				Validators.maxLength(this.maxPasswordLength),
				Validators.pattern(this.strongPasswordRegex),
			]),
		],
	};

	constructor(private readonly loginService: LoginService, private readonly formBuilder: FormBuilder) {}

	ngOnInit(): void {
		if (this.isLogin === true) {
			this.form = this.formBuilder.group(this.loginGroup);
		} else {
			this.form = this.formBuilder.group(this.createGroup, {
				validators: this.isLogin,
			});
		}
	}

	login(): void {
		this.loginService.loginWithGoogle();
	}

	signIn(): void {
		// shouldn't be able to access this method as the button will be disabled if the form is invalid.
		const { email, password } = this.form.value;
		if (this.isLogin === true) {
			this.loginService.loginWithEmailAndPassword(email, password);
		} else {
			this.loginService.createWithEmailAndPassword(email, password);
		}
	}

	googleSignIn(): void {
		this.loginService.loginWithGoogle();
	}

	checkPasswords(group: FormGroup): { [key: string]: any } | null {
		const pass: string = group?.get('password')?.value ?? null;
		const confirmPass: string = group?.get('retypedPassword')?.value ?? null;

		// javascript is very picky about null comparisons thus the way this if statement is written.
		// probably should be using lodash-es, but ... *shrug*
		if (!(pass == null) && !(confirmPass == null)) {
			return pass === confirmPass ? null : { notSame: true };
		}

		return { notSame: true };
	}
}
