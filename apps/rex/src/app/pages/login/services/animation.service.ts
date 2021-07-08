import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable()
export class AnimationService {
	public readonly loginAnimationState$: ReplaySubject<'login' | 'create'> = new ReplaySubject(1);

	constructor() {
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
}
