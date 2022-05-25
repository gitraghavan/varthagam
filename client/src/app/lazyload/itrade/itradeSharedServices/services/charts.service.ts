import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable ({
    providedIn: 'root'
})
export class UserDetailsService {
    constructor (private http: HttpClient) {
        //
    }

    getHistoricalChart () {
        return this.http.get ('/varthagamitrade/screener/chart/historicalcharts')
    }
}
