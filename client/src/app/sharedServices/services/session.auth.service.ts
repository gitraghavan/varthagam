import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

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
        return this.http.get ('/oauth/v1/initiateicicilogin').pipe (
            map (() => {
                return this.cookieService.getLoginCookies ();
            })
            // Implement catchError
        );
    }
}
