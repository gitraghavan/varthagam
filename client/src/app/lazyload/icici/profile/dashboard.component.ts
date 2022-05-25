import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component ({
    selector: 'icici-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor (private router: ActivatedRoute) {
        //
    }

    ngOnInit () {
        const rVal = this.router.snapshot.data;
        console.log (rVal);
    }
}
