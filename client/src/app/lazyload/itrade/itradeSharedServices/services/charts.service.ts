import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable ({
    providedIn: 'any'
})
export class ChartServices {
    constructor (private http: HttpClient) {
        //
    }

    getHistoricalChart (s: any, filterOptions?: any) {
        let ns = `${s.exch}/${s.scrip}`;
        let postBody = {};
        const today = new Date ();

        // 7 days a week is sorted numerically in a loop
        // We have moved 4 days ahead so that we target Thursday
        // We have 0 to handle the 7th day of the week. Assumption is that the current day is a thursday
        const days = [4, 3, 2, 1, 0, 6, 5];

        // Temporary default data for post method
        filterOptions = {
            // Always get the upcoming Thursday expiry date
            exp_date: new Date (today.setDate (today.getDate () + days [today.getDay ()])),
            to_date: new Date (),
            from_date: new Date (today.setMonth (today.getMonth () - 36)),
            interval: 'day'
        };

        if (filterOptions) {
            postBody = filterOptions;
        }
        return this.http.post (`/varthagamitrade/events/chart/historicalcharts/${ns}`, postBody);
    }
}
