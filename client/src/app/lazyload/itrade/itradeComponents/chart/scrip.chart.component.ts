import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component ({
    selector: 'scrip-chart',
    templateUrl: './scrip.chart.component.html',
    styleUrls: ['./scrip.chart.component.scss']
})
export class ScripChart implements OnInit {
    ngOnInit (): void {
        console.log (d3);
    }
}
