import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable ()
export class CustomerFundsService {
    constructor (private http: HttpClient) {
        //
    }

    getFundsSummary () {
        return this.http.get ('./varthagamitrade/profile/customer/funds/summary')
    }
}
