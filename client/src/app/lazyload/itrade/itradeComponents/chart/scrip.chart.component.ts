import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as d3 from 'd3';

import { OHLCChartService } from '../../itradeSharedServices';

@Component ({
    selector: 'scrip-chart',
    templateUrl: './scrip.chart.component.html',
    styleUrls: ['./scrip.chart.component.scss']
})
export class ScripChart implements OnInit, AfterViewInit {
    @ViewChild ('scripChartCanvas') scripChartCanvasEl!: ElementRef;

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
        console.log (this.ohlcData);

        const canvasMargins = { ml: 150, mr: 20, mt: 20, mb: 100 };
        const graphWidth = 600 - canvasMargins.ml - canvasMargins.mr;
        const graphHeight = 300 - canvasMargins.mt - canvasMargins.mb;
        const min: number = Number (d3.min (this.ohlcData, (d: any) => Number (d.volume)));
        const max: number = Number (d3.max (this.ohlcData, (d: any) => Number (d.volume)));

        const x = d3.scaleBand ()
            .domain ((this.ohlcData.map ((d: any) => d.datetime)))
            .range ([0, graphWidth])
            .paddingInner (0.4);

        const y = d3.scaleLinear ()
            .domain ([0, Number (max)])
            .range ([graphHeight, 0]);

        const chartSvgCanvas = d3.select (this.scripChartCanvasEl.nativeElement)
            .append ('svg')
                .attr ('width', 600)
                .attr ('height', 300);

        // Group & Append
        const volChartGroup = chartSvgCanvas.append ('g')
            .attr ('width', graphWidth)
            .attr ('height', graphHeight)
            .attr ('transform', `translate(${canvasMargins.ml})`);
        const xAxisGroup = chartSvgCanvas.append ('g')
            .attr ('transform', `translate(${canvasMargins.ml}, ${graphHeight})`);
        const yAxisGroup = chartSvgCanvas.append ('g')
            .attr ('transform', `translate(${canvasMargins.ml})`);

        // Pass Data to Chart
        const chartSvg = volChartGroup.selectAll ('svg')
            .data (this.ohlcData);

        // Chart Enter methods
        chartSvg.enter ()
            .append ('rect')
                .attr ('width', x.bandwidth)
                .attr ('height', (d: any, i: number) => y (d.volume))
                .attr ('x', (d: any, i: number) => Number (x (d.datetime)))
                .attr ('fill', 'red');

        const xAxis = d3.axisBottom (x)
            .ticks (1);
        const yAxis = d3.axisLeft (y)
            .ticks (2)
            .tickFormat ((d: any) => {
                console.log (d);
                return d;
            });

        xAxisGroup.call (xAxis);
        yAxisGroup.call (yAxis);
    }
}
