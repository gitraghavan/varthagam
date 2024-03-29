import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerDetailsService } from '../../itradeSharedServices';

@Component ({
    selector: 'itrade-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    totalInvestment: number = 0;
    currentInvestment: number = 0;

    profile: any;
    holdings: any;
    funds: any;

    holdingsTitle = ['Stock Code', 'QTY', 'Avg Price', 'LTP'];

    constructor (private activatedRoute: ActivatedRoute,
        private cds: CustomerDetailsService) {
    }

    ngOnInit () {
        this.holdings = this.activatedRoute.snapshot.data[0].holdings;
        this.funds = this.activatedRoute.snapshot.data[0].funds;

        this.holdings.map ((v: any) => {
            return Math.round(v.change_percentage * 100) / 100;
        })

        this.cds.profileData
            .subscribe ((d: any) => {
                this.profile = d;
            });
    }
}
