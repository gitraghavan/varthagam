import { Injectable } from '@angular/core';

import * as d3 from 'd3';

import { BehaviorSubject } from 'rxjs';

@Injectable ({
	providedIn: 'any'
})
export class OHLCChartService {
    graphWidth: BehaviorSubject<number> = new BehaviorSubject<number> (0);
    graphHeight: BehaviorSubject<number> = new BehaviorSubject<number> (0);

    formatDate (dt: Date) {
        const formatter = d3.timeFormat ('%d %b');
        return formatter (dt);
    }
    formatNum (n: Number) {
        const formatter = d3.format ('.2s');
        return formatter (n);
    }

    initCandlestickChart (name: string, c: any) {
        // Margins & Sizes
        const fullWidth = c.elm.getBoundingClientRect ().width;
        const maxHeight = c.elm.getBoundingClientRect ().height - 10; // -10 px to adjust scrolling
        this.graphWidth.next (fullWidth - c.chartMargins.ml - c.chartMargins.mr);
        this.graphHeight.next (maxHeight - c.chartMargins.mt - c.chartMargins.mb);

        const min: number = Number (d3.min (c.data, (d: any) => Number (d.low)));
        const max: number = Number (d3.max (c.data, (d: any) => Number (d.high)));
        const dateExtent = <[Date, Date]>d3.extent (c.data, (d: any) =>  new Date (d.datetime));

        // Event Handlers
        const chartZoomEvent = (e: any) => {
            const t = e.selection || e.transform;
            const rx = t.rescaleX (x);
            const ry = t.rescaleY (y);
            // const newTheory = d3.zoomIdentity ();

            console.log (ry.domain ());

            xAxis = this.xAxisConf (rx);
            // yAxis = this.yAxisConf (ry);

            xAxisGroup.call (xAxis);
            yAxisGroup.call (yAxis);
            refreshChart (rx, y);
        };

        // Axes & Scales
        const x = d3.scaleUtc ()
            .domain (dateExtent)
            .range ([0, this.graphWidth.value])
            .nice ();
        const y = d3.scaleLinear ()
            .domain ([min, Number (max)])
            .range ([this.graphHeight.value, 0])
            .nice ();
        const zoomInit = <any>d3.zoom ()
            .scaleExtent ([1, 8])
            .on ('zoom', chartZoomEvent);

        // Chart Canvas & Groups & Clip Paths
        const chartSvgCanvas = d3.select (c.elm).append ('svg')
            .attr ('width', `${fullWidth}px`)
            .attr ('height', `${maxHeight}px`);

        const xAxisGroup = chartSvgCanvas.append ('g')
            .attr ('class', 'x chart-axis')
            .attr ('transform', `translate(${c.chartMargins.ml}, ${this.graphHeight.value + c.chartMargins.mt})`);
        const yAxisGroup = chartSvgCanvas.append ('g')
            .attr ('class', 'y chart-axis')
            .attr ('transform', `translate(${this.graphWidth.value + c.chartMargins.ml}, ${c.chartMargins.mt})`);
        
        chartSvgCanvas.append ('clipPath')
            .attr("id", 'chart-clip')
            .append("rect")
                .attr("x", c.chartMargins.ml)
                .attr("y", c.chartMargins.mt)
                .attr("width", this.graphWidth.value)
                .attr("height", this.graphHeight.value);
        const chartPointGroup = chartSvgCanvas.append ('g')
            .attr ('clip-path', 'url(#chart-clip)')
            .attr ('class', 'chart-view-area')
            .attr ('width', this.graphWidth.value)
            .attr ('height', this.graphHeight.value);

        // Join Data and render points
        const chartDataGroup: any = chartPointGroup.selectAll ('g')
                .data (c.data).join ('g');
        const lowHigh = chartDataGroup.append ('line')
            .attr ('stroke-width', '0.5px')
            .attr ('stroke', 'white');

        const openClose = chartDataGroup.append ('line')
            .attr ('stroke-width', '5px')
            .attr ('stroke-linecap', 'round')
            .attr ('stroke', (d: any) => d.open > d.close ? (d.open === d.close ? 'white' : 'red') : 'green');

        const refreshChart = (ax: any, ay: any) => {
            lowHigh
                .attr ('x1', (d: any) => ax (new Date (d.datetime)))
                .attr ('y1', (d: any) => ay (d.low))
                .attr ('x2', (d: any) => ax (new Date (d.datetime)))
                .attr ('y2', (d: any) => ay (d.high));
            openClose
                .attr ('x1', (d: any) => ax (new Date (d.datetime)))
                .attr ('y1', (d: any) => ay (d.open))
                .attr ('x2', (d: any) => ax (new Date (d.datetime)))
                .attr ('y2', (d: any) => Math.round (ay (d.close)));
        }

        let xAxis = this.xAxisConf (x);
        let yAxis = this.yAxisConf (y);

        xAxisGroup.call (xAxis);
        yAxisGroup.call (yAxis);
        chartSvgCanvas
            .call (zoomInit)
            .on ('wheel', (e: any) => e.preventDefault ());

        refreshChart (x, y);
    }

    xAxisConf (x: any) {
        return d3.axisBottom (x)
            .tickSize (-this.graphHeight.value)
            .tickSizeOuter (0);
    }

    yAxisConf (y: any) {
        return d3.axisRight (y)
            // .ticks (3)
            .tickFormat ((d: any) => this.formatNum (d))
            .tickSize (-this.graphWidth.value)
            .tickSizeOuter (0);
    }
}
