import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isEmpty as _isEmpty } from 'lodash-es';
import { Injectable } from '@angular/core';

declare const window: Window;

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
	public intercept(req: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
		const jwtToken: string = window.sessionStorage.getItem('jwtToken') ?? '';
		let authReq = req;
		if (!_isEmpty(jwtToken)) {
			authReq = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${jwtToken}`.trim()),
			});
		}

		return httpHandler.handle(authReq);
	}
}
