import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable ({
    providedIn: 'any'
})
export class ChartServices {
    constructor (private http: HttpClient) {
        //
    }

    getHistoricalChart (s: any) {
        let ns = `nse/${s.scrip}`;
        if (s.exch) {
            ns = `${s.exch}/${s.scrip}`;
        }
        return this.http.get (`/varthagamitrade/events/chart/historicalcharts/${ns}`)
    }
}
