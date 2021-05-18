import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '@solid-octo-couscous/model';

@Injectable()
export class WorkoutService {
	constructor(private readonly httpClient: HttpClient) {}

	public getWorkout(): void {
		this.httpClient
			.get<Transaction<any>>(`http://localhost:3333/v1/workout/get`)
			.subscribe(({ data: workout }) => console.log(workout));
	}
}
