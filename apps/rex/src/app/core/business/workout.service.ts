import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@solid-octo-couscous/model';

import { environment } from '../../../environments/environment';

@Injectable()
export class WorkoutService {
	private readonly baseUrl: string = environment.baseUrl;
	private readonly workoutApi: string = environment.workoutApi;
	private readonly workoutApiVersionOne: string = environment.apiVersionOne;

	private workoutResource = `${this.baseUrl}/${this.workoutApiVersionOne}/${this.workoutApi}`;

	constructor(private readonly httpClient: HttpClient) {}

	public getWorkout(): void {
		this.httpClient.get<Transaction<any>>(`${this.workoutResource}/get`).subscribe(e => console.table(e));
	}
}
