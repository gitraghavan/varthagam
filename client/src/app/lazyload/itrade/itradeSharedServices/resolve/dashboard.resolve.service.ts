import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, forkJoin, map, take } from 'rxjs';

import { CustomerDetailsService, CustomerFundsService } from '../index';

@Injectable ({
    providedIn: 'any'
})
export class DashboardResolveService implements Resolve<Observable<any>> {
    constructor (private cds: CustomerDetailsService, private cfs: CustomerFundsService) {
        //
    }

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const dematHoldings = this.cds.getDematHoldings ();
        const customerFunds = this.cfs.getFundsSummary ();
        
        return forkJoin ([dematHoldings, customerFunds])
            .pipe (
                map ((d: any) => {
                    return {
                        holdings: d[0],
                        funds: d[1]
                    };
                })
            );
    }   
}
