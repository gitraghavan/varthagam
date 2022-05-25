import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, catchError } from 'rxjs';

import { CookieAppService } from 'src/app/commonServices/mainCommonServicesIndex';

@Injectable ({
    providedIn: 'root'
})
export class UserAuthService {
    constructor (private http: HttpClient,
        private cookieService: CookieAppService) {
        //
    }

    userLogin (): any {
        return this.http.get ('/varthagamitrade/oauth/v1/initiateicicilogin').pipe (
            map (() => {
                return this.cookieService.getLoginCookies ();
            }),
            catchError ((err: any) => {
                return err;
            })
        );
    }
}
