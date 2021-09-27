/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Unsubscriber } from '@solid-octo-couscous/model';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from './business/auth.service';

@Injectable()
export class LoggedInGuard extends Unsubscriber implements CanActivate, CanActivateChild {
	constructor(private readonly authService: AuthService) {
		super();
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authService.isLoggedIn().pipe(
			map(transaction => transaction.data === true),
			takeUntil(this.ngUnsubscribe)
		);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.canActivate(childRoute, state);
	}
}
