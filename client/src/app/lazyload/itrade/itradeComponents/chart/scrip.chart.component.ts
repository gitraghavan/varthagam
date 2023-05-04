import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OHLCChartService } from '../../../../commonServices/index';

@Component ({
    selector: 'scrip-chart',
    templateUrl: './scrip.chart.component.html',
    styleUrls: ['./scrip.chart.component.scss']
})
export class ScripChart implements OnInit, AfterViewInit {
    @ViewChild ('candleStickChartCanvas') candleStickChartCanvasEl!: ElementRef;

    ohlcData: any;

    constructor (private activatedRoute: ActivatedRoute,
        private ohlcChartService: OHLCChartService) {
        //
    }

    ngOnInit (): void {
        this.activatedRoute.data.subscribe ((d: any) => {
            this.ohlcData = d[0].Success;
        });
    }

    ngAfterViewInit (): void {
        const elm = this.candleStickChartCanvasEl.nativeElement;
        const chartMargins = { ml: 24, mr: 56, mt: 16, mb: 40 };

        setTimeout (() => {
            this.ohlcChartService.initCandlestickChart ('ohlc', {
                elm,
                chartMargins,
                data: this.ohlcData,
                toolTip: true,
                crossHairs: true
            });
        }, 100);
    }
}
