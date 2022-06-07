import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerDetailsService } from '../itradeSharedServices';

@Component ({
    selector: 'itrade-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    profile: any;
    holdings: any;
    funds: any;
    holdingsTitle = ['Stock Code', 'Quantity', 'Current Price', '%'];

    constructor (private activatedRoute: ActivatedRoute,
        private cds: CustomerDetailsService) {
    }

    ngOnInit () {
        this.holdings = this.activatedRoute.snapshot.data[0].holdings;
        this.funds = this.activatedRoute.snapshot.data[0].funds;

        console.log (this.holdings);
        console.log (this.funds);

        this.cds.profileData
            .subscribe ((d: any) => {
                this.profile = d;
            });
    }
}
