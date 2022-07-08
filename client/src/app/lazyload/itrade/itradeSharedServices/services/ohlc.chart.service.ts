import { Injectable } from '@angular/core';

import * as d3 from 'd3';

@Injectable ({
	providedIn: 'any'
})
export class OHLCChartService {
	prepareChartConfig (data: any, type: string) {
		switch (type) {
			case 'ohlc': {
				this.ohlcOptions (data);
				break;
			}
			default: {
				console.log ('line');
			}
		}
		const chartOptions = '';
		return chartOptions;
	}

	ohlcOptions (d: any) {
		const canvasMargins = { ml: 150, mr: 100, mt: 100, mb: 150 };
        const graphWidth = 600 - canvasMargins.ml - canvasMargins.mr;
        const graphHeight = 600 - canvasMargins.mt - canvasMargins.mb;
        const min: number = Number (d3.min (d, (v: any) => Number (v.volume)));
        const max: number = Number (d3.max (d, (v: any) => Number (v.volume)));
		console.log (d);
		return d;
	}
}
