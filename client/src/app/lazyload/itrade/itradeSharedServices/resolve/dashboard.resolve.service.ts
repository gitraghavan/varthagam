import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, forkJoin, map, finalize } from 'rxjs';

import { LoadingService } from '../../../../commonServices';
import { CustomerDetailsService, CustomerFundsService } from '../index';

@Injectable ({
    providedIn: 'any'
})
export class DashboardResolveService implements Resolve<Observable<any>> {
    constructor (private loadingService: LoadingService,
        private cds: CustomerDetailsService, private cfs: CustomerFundsService) {
        //
    }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        this.loadingService.showLoader ();
        const portfolioHoldings = this.cds.getPortfolioHoldings (true);
        const customerFunds = this.cfs.getFundsSummary (true);
        
        return forkJoin ([portfolioHoldings, customerFunds])
            .pipe (
                map ((d: any) => {
                    return {
                        holdings: d[0],
                        funds: d[1]
                    };
                }),
                finalize (() => this.loadingService.stopLoader ())
            );
    }   
}
