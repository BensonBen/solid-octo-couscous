import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { NewUserRequest } from '@solid-octo-couscous/model';
import { isNil as _isNil } from 'lodash-es';
import { Observable } from 'rxjs';

import { CurrentUserStoreActions } from '../../../root-state/current-user';
import { RootStoreState } from '../../../root-state/root-state';
import { AnimationService } from '../services/animation.service';

@Component({
	selector: 'soc-create-component',
	templateUrl: './create-component.component.html',
	styleUrls: ['./create-component.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponentComponent implements OnInit {
	form!: FormGroup;
	matFormFieldAppearance: MatFormFieldAppearance = 'fill';
	isValidUsername$: Observable<boolean>;

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
		private readonly formBuilder: FormBuilder,
		private readonly animationService: AnimationService,
		private readonly store$: Store<RootStoreState>
	) {}

	ngOnInit(): void {
		this.createGroup.loginName;
		this.form = this.formBuilder.group(this.createGroup, {
			validators: this.checkPasswords,
		});
	}

	readonly checkPasswords = (group: FormGroup): { [key: string]: any } | null => {
		const pass: string = group?.get('password')?.value ?? null;
		const confirmPass: string = group?.get('retypedPassword')?.value ?? null;

		return !_isNil(pass) && !_isNil(confirmPass) ? null : { notSame: true };
	};

	createAccount(): void {
		const { email, password, dateOfBirth, loginName } = this.form.value;
		const newUserRequest: NewUserRequest = {
			email,
			password,
			dateOfBirth: (dateOfBirth as Date)?.getTime(),
			loginName,
		};
		this.store$.dispatch(CurrentUserStoreActions.createUserRequest({ newUserRequest }));
	}

	goToLogin(): void {
		this.animationService.toggleAnimationState();
	}
}
