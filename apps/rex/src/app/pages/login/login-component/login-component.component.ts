import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CurrentUserStoreActions } from '../../../root-state/current-user';
import { RootStoreState } from '../../../root-state/root-state';

@Component({
	selector: 'soc-login-component',
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
	private readonly loginGroup: Record<string, Validators> = {
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
		private readonly activatedRoute: ActivatedRoute,
		private readonly formBuilder: FormBuilder,
		private readonly store$: Store<RootStoreState>,
		private readonly router: Router
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group(this.loginGroup);
	}

	signIn(): void {
		const { loginName, password } = this.form.value;
		this.store$.dispatch(CurrentUserStoreActions.loginUserRequest({ loginName, password }));
		// this.router.navigate(['../main'], { relativeTo: this.activatedRoute });
	}

	createAccount(event: Event): void {
		event.preventDefault();
		this.router.navigate(['../createAccount'], { relativeTo: this.activatedRoute });
	}
}
