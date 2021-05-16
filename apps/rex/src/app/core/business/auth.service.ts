import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserRequest, NewUserRequest, Transaction, User } from '@solid-octo-couscous/model';
import { environment } from '../../../environments/environment';

declare const window: Window;

@Injectable()
export class AuthService {
	private readonly baseUrl: string = environment.baseUrl;
	private readonly authApi: string = environment.authApi;
	private readonly authApiVersion: string = environment.apiVersionOne;

	private readonly authResource: string = `${this.baseUrl}/${this.authApiVersion}/${this.authApi}`;

	constructor(private readonly httpClient: HttpClient) { }

	public createAccount(userRequestInformation: NewUserRequest): Observable<Transaction<User>> {
		return this.httpClient.post<Transaction<User>>(
			`${this.authResource}/createAccount`,
			userRequestInformation
		);
	}

	public loginWithEmailAndPassword(userLoginInformation: LoginUserRequest): Observable<Transaction<User>> {
		return this.httpClient.post<Transaction<User>>(
			`${this.authResource}/login`,
			userLoginInformation
		);
	}

	public isDuplicationUsername(username: string): Observable<Transaction<User>> {
		return this.httpClient.post<Transaction<User>>(
			`${this.authResource}/duplicateUsername`,
			username
		);
	}
}
