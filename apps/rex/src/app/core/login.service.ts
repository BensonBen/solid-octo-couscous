import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
	public readonly loginAnimationState$: ReplaySubject<'login' | 'create'> = new ReplaySubject(1);
	private readonly api = `${environment.baseUrl}${environment.apiVersionOne}`;

	constructor(private readonly httpClient: HttpClient) {
		// the first animation state should be login.
		this.loginAnimationState$.next('login');
	}

	toggleAnimationState(): void {
		this.loginAnimationState$
			.pipe(first())
			.subscribe(currentState =>
				currentState === 'login'
					? this.loginAnimationState$.next('create')
					: this.loginAnimationState$.next('login')
			);
	}

	loginWithEmailAndPassword(email: string, password: string): void {
		console.log('Future Implementation');
	}

	createWithEmailAndPassword(email: string, password: string, dateOfBirth: number, retypedPassword: string): void {
		this.httpClient
			.post(`${this.api}/auth/createAccount`, { email, password, dateOfBirth, retypedPassword })
			.pipe(first())
			.subscribe(e => console.log(e));
	}
}
