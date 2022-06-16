import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

import { LoadingService } from '../../../../commonServices';

@Injectable ()
export class CustomerFundsService {
    constructor (private http: HttpClient,
        private loadingService: LoadingService) {
        //
    }

    getFundsSummary (loader: boolean = false) {
        const fundsSummary$ = this.http.get ('./varthagamitrade/profile/customer/funds/summary')
            .pipe (
                catchError ((err: any) => err)
            );
        
        if (loader) {
            return fundsSummary$;
        }

        return this.loadingService.showLoaderUntilCompleted (fundsSummary$);
    }
}
