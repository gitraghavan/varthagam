import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';

import { Observable } from 'rxjs';

@Injectable ()
export class AuthInterceptorService implements HttpInterceptor {
    constructor () {
        //
    }

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes ('oauth')) {
            return next.handle (req);
        }
        return next.handle (req);
    }
}
