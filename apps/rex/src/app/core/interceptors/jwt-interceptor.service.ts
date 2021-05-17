import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isNil as _isNil } from 'lodash-es';
import { Injectable } from '@angular/core';

declare const window: Window;

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
	public intercept(req: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
		const jwtToken: string = window.sessionStorage.getItem('jwt') ?? '';
		if (!_isNil(jwtToken)) {
			req.headers.append('Content-Type', 'application/json');
			req.headers.append('Authorization', `Bearer ${jwtToken}`);
		}

		return httpHandler.handle(req);
	}
}
