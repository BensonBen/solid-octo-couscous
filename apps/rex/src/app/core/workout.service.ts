import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '@solid-octo-couscous/model';

declare const window: Window;

@Injectable()
export class WorkoutService {
	constructor(private readonly httpClient: HttpClient) {}

	public getWorkout(): void {
		const headers: HttpHeaders = new HttpHeaders();
		headers.append('Authorization', window.sessionStorage.getItem('jwt') ?? '');

		const createAccountRequest: Observable<Transaction<any>> = this.httpClient.get<Transaction<any>>(
			`http://localhost:3333/v1/workout/get`,
			{
				headers,
			}
		);

		createAccountRequest.subscribe(({ data: workout }) => console.log(workout));
	}
}
