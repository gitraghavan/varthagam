import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,
    BehaviorSubject,
    tap, catchError } from 'rxjs';

import { io } from 'socket.io-client';

import { ICustomerDetails } from '../index';
import { LoadingService } from '../../../../commonServices';

@Injectable ()
export class CustomerDetailsService {
    private profileStore$: BehaviorSubject<any> = new BehaviorSubject<any> ('');
    profileData: Observable<ICustomerDetails> = this.profileStore$.asObservable ();

    testSocketCon = io ('ws://localhost:2260', {
        transports: [ 'websocket' ]
    });

    constructor (private http: HttpClient,
        private loadingService: LoadingService) {
            //
    }

    getCustomerDetails () {
        const custDetails$ = this.http.get ('/varthagamitrade/profile/customer/details')
            .pipe (
                tap ((d: any) => {
                    this.profileStore$.next (d);
                }),
                catchError ((err: any) => err)
            );

        return this.loadingService.showLoaderUntilCompleted (custDetails$);
    }

    getPortfolioHoldings (loader: boolean = false) {
        const portfolioHoldings$ = this.http.get ('/varthagamitrade/profile/customer/holdings')
            .pipe (
                tap ((d: any) => {
                    const invested: any = [];
                    const ltp: any = [];
                    d.map ((v: any) => {
                        const a = Math.round ((v.average_price * v.quantity) * 100) / 100;
                        const b = Math.round ((v.current_market_price * v.quantity) * 100) / 100;
                        invested.push (a);
                        ltp.push (b);
                        return v.investment = a;
                    });
                    const totalInvestedAmount = invested.reduce ((investment: number, a: number) => investment + a);
                    const currentInvestedValue = ltp.reduce ((investment: number, a: number) => investment + a);
                    console.log (totalInvestedAmount);
                    localStorage.setItem ('tia', totalInvestedAmount);
                    localStorage.setItem ('civ', currentInvestedValue);
                    return d;
                }),
                catchError ((err: any) => err)
            );

        if (loader) {
            return portfolioHoldings$;
        }

        return this.loadingService.showLoaderUntilCompleted (portfolioHoldings$);
    }

    getHistoricalData () {
        this.testSocketCon.on ('historicaldata', (a) => {
            console.log (a);
        });
    }
}
