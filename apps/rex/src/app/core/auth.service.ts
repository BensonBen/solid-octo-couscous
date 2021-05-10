import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginUserRequest, NewUserRequest, Transaction, User } from '@solid-octo-couscous/model';

declare const window: Window;

@Injectable()
export class AuthService {
	constructor(private readonly httpClient: HttpClient) {}

	public createAccount(userRequestInformation: NewUserRequest): Observable<Transaction<User>> {
		const createAccountRequest: Observable<Transaction<string>> = this.httpClient.post<Transaction<string>>(
			`http://localhost:3333/v1/auth/createAccount`,
			userRequestInformation
		);

		createAccountRequest.subscribe(({ data: jwtToken }) => window.sessionStorage.setItem('jwt', jwtToken));
		return of((null as unknown) as any);
	}

	public loginWithEmailAndPassword(userLoginInformation: LoginUserRequest): Observable<Transaction<User>> {
		const authLoginRequest: Observable<Transaction<string>> = this.httpClient.post<Transaction<string>>(
			`http://localhost:3333/v1/auth/login`,
			userLoginInformation
		);

		authLoginRequest.subscribe(({ data: jwtToken }) => window.sessionStorage.setItem('jwt', jwtToken));
		return of((null as unknown) as any);
	}
}
