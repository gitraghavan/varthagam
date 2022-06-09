import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, finalize } from 'rxjs/operators';

import { LoadingService } from '../../../../commonServices';

@Injectable ()
export class CustomerFundsService {
    constructor (private http: HttpClient,
        private loadingService: LoadingService) {
        //
    }

    getFundsSummary () {
        const loadService = this.http.get ('./varthagamitrade/profile/customer/funds/summary')
            .pipe (
                catchError ((err: any) => err)
            );

        return this.loadingService.showLoaderUntilCompleted (loadService);
    }
}
