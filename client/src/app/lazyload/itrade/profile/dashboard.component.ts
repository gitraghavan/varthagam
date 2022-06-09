import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

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

    holdingsTitle = ['Stock Code', 'QTY', 'Avg Price', 'LTP'];

    themeControl: FormControl = new FormControl (false);

    isDarkMode: boolean = false;

    constructor (private activatedRoute: ActivatedRoute,
        private cds: CustomerDetailsService) {
    }

    ngOnInit () {
        this.themeControl.valueChanges.subscribe ((v: boolean) => {
            this.isDarkMode = v;
        });
        this.holdings = this.activatedRoute.snapshot.data[0].holdings;
        this.funds = this.activatedRoute.snapshot.data[0].funds;

        console.log (this.holdings);
        console.log (this.funds);

        this.holdings.map ((v: any) => {
            return Math.round(v.change_percentage * 100) / 100;
        })

        this.cds.profileData
            .subscribe ((d: any) => {
                this.profile = d;
            });
    }
}
