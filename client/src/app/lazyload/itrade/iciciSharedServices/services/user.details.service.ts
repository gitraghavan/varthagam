import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable ({
    providedIn: 'root'
})
export class UserDetailsService {
    constructor (private http: HttpClient) {
        //
    }

    getUserDetails () {
        return this.http.get ('/varthagamitrade/profile/user/customer/details')
    }

    getDematHoldings () {
        return this.http.get ('/varthagamitrade/profile/user/customer/dematHoldings')
    }
}
