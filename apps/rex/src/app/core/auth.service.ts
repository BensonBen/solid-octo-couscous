import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserRequest, NewUserRequest, Transaction, User } from '@solid-octo-couscous/model';

@Injectable()
export class AuthService {
	constructor(private readonly httpClient: HttpClient) {}

	public createAccount(userRequestInformation: NewUserRequest): Observable<Transaction<User>> {
		return this.httpClient.post<Transaction<User>>(
			`http://localhost:3333/v1/auth/createAccount`,
			userRequestInformation
		);
	}

	public loginWithEmailAndPassword(userLoginInformation: LoginUserRequest): Observable<Transaction<User>> {
		return this.httpClient.post<Transaction<User>>(`http://localhost:3333/v1/auth/login`, userLoginInformation);
	}
}
