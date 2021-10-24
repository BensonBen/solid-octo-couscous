import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserRequest, LoginUserResponse, NewUserRequest, Transaction } from '@solid-octo-couscous/model';
import { environment } from '../../../environments/environment';

declare const window: Window;
@Injectable()
export class AuthService {
	private readonly baseUrl: string = environment.baseUrl;
	private readonly authApi: string = environment.authApi;
	private readonly authApiVersion: string = environment.apiVersionOne;

	private authResource = `${this.baseUrl}/${this.authApiVersion}/${this.authApi}`;

	constructor(private readonly httpClient: HttpClient) {}

	public persistJwtTokenToSessionStorage(jwtToken: string): void {
		// doesn't really matter if session storage isn't a thing on a given browser.
		// That browser won't be supported.
		window?.sessionStorage.setItem('jwtToken', jwtToken);
	}

	public createAccount(newUserRequest: NewUserRequest): Observable<Transaction<LoginUserResponse>> {
		return this.httpClient.post<Transaction<LoginUserResponse>>(`${this.authResource}/createAccount`, newUserRequest);
	}

	public loginWithEmailAndPassword(loginUserRequest: LoginUserRequest): Observable<Transaction<LoginUserResponse>> {
		return this.httpClient.post<Transaction<LoginUserResponse>>(`${this.authResource}/login`, loginUserRequest);
	}

	public isDuplicationUsername(username: string): Observable<Transaction<LoginUserResponse>> {
		return this.httpClient.post<Transaction<LoginUserResponse>>(`${this.authResource}/duplicateUsername`, username);
	}

	public isLoggedIn(): Observable<Transaction<boolean>> {
		// don't really need to send anything specific. it's just to trip people up
		return this.httpClient.post<Transaction<boolean>>(`${this.authResource}/isLoggedIn`, null);
	}
}
