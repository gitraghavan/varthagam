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
        // Sizes & Margins
        const chartMargins = { ml: 80, mr: 10, mt: 10, mb: 40 };
        const fullWidth = this.scripChartCanvasEl.nativeElement.getBoundingClientRect ().width;
        const maxHeight = this.scripChartCanvasEl.nativeElement.getBoundingClientRect ().height;
        const graphWidth = fullWidth - chartMargins.ml - chartMargins.mr;
        const graphHeight = maxHeight - chartMargins.mt - chartMargins.mb;
        const min: number = Number (d3.min (this.ohlcData, (d: any) => Number (d.volume)));
        const max: number = Number (d3.max (this.ohlcData, (d: any) => Number (d.volume)));
        const dateExtent = <[Date, Date]>d3.extent (this.ohlcData, (d: any) =>  new Date (d.datetime));

        // Factory Helper Methods
        const formatDate = (dt: Date) => {
            const formatTime = d3.timeFormat ('%d %b');
            return formatTime (dt);
        }

        // Scales
        const x = d3.scaleBand ()
            .domain (this.ohlcData.map ((d: any) => formatDate (new Date (d.datetime))))
            .range ([0, graphWidth])
            .paddingInner (0.1)
            .paddingOuter(0.1);
        const y = d3.scaleLinear ()
            .domain ([0, Number (max)])
            .range ([graphHeight, 0]);

        // SVG Canvas and Groups
        const chartSvgCanvas = d3.select (this.scripChartCanvasEl.nativeElement)
            .append ('svg')
                .attr ('width', fullWidth)
                .attr ('height', maxHeight);
        const volChartGroup = chartSvgCanvas.append ('g')
            .attr ('width', graphWidth)
            .attr ('height', graphHeight)
            .attr ('transform', `translate(${chartMargins.ml}, ${chartMargins.mt})`);
        const xAxisGroup = chartSvgCanvas.append ('g')
            .attr ('transform', `translate(${chartMargins.ml}, ${graphHeight + chartMargins.mt})`);
        const yAxisGroup = chartSvgCanvas.append ('g')
            .attr ('transform', `translate(${chartMargins.ml}, ${chartMargins.mt})`);

        // Chart Data, Enter, Exit and Update methods
        const chartSvg = volChartGroup.selectAll ('svg')
            .data (this.ohlcData);
        chartSvg.enter ()
            .append ('rect')
                .attr ('width', x.bandwidth)
                .attr ('height', (d: any) => graphHeight - y (d.volume))
                .attr ('x', (d: any) => {
                    return Number (x (formatDate (new Date (d.datetime))));
                })
                .attr ('y', (d: any) => Number (y (d.volume)))
                .attr ('fill', 'red');

        // Axis
        const xAxis = d3.axisBottom (x);
        const yAxis = d3.axisLeft (y)
            .ticks (2);

        xAxisGroup.call (xAxis)
            .selectAll ('text');
        yAxisGroup.call (yAxis);
    }
}
