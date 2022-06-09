import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,
    BehaviorSubject,
    tap, catchError, finalize } from 'rxjs';

import { ICustomerDetails } from '../index';
import { LoadingService } from '../../../../commonServices';

@Injectable ()
export class CustomerDetailsService {
    private profileStore$: BehaviorSubject<any> = new BehaviorSubject<any> ('');
    profileData: Observable<ICustomerDetails> = this.profileStore$.asObservable ();

    constructor (private http: HttpClient,
        private loadingService: LoadingService) {
            //
    }

    getCustomerDetails () {
        const loadService = this.http.get ('/varthagamitrade/profile/customer/details')
            .pipe (
                tap ((d: any) => {
                    this.profileStore$.next (d);
                }),
                catchError ((err: any) => err)
            );

        return this.loadingService.showLoaderUntilCompleted (loadService);
    }

    getPortfolioHoldings () {
        const loadService = this.http.get ('/varthagamitrade/profile/customer/holdings')
            .pipe (
                catchError ((err: any) => err)
            );

        return this.loadingService.showLoaderUntilCompleted (loadService);
    }
}