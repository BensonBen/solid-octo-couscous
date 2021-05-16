import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptorService } from './jwt-interceptor.service';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
];