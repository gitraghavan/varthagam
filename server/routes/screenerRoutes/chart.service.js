import KoaRouter from 'koa-router';

import env from '../../configs/config.dev.js';

import CommonServiceLayer from '../../utilities/services/common.request.layer.service.js';
import CookieService from '../../utilities/services/auth/cookie.service.js';
import ChecksumCompute from '../../utilities/services/auth/checksum.service.js';

const router = new KoaRouter ({
    prefix: 'chart'
});

router.get ('/historicalcharts', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        const reqBody = JSON.stringify ({
            interval: '30minute',
            from_date: '2022-05-01T07:00:00.000Z',
            to_date: '2022-05-24T07:00:00.000Z',
            stock_code: 'AXIBAN',
            exchange_code: 'NSE',
            segment: '',
            product_type: 'Futures',
            exercise_type: '',
            expiry_date: '2022-05-26T07:00:00.000Z',
            option_type: 'Others',
            strike_price: '0'
        });
        const dant = new Date ();
        dant.setMilliseconds (0)
        const time_stamp = dant.toISOString ();

        const sesTok = await CookieService.getSessionUsingCookies (ctx.request.header.cookie);
        const checksumToken = ChecksumCompute.constructChecksum (reqBody, time_stamp);
        
        const options = {
            host: 'api.icicidirect.com',
            path: '/breezeapi/api/v1/historicalcharts',
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Content-Length': Buffer.byteLength (reqBody),
                'X-Checksum': `token ${checksumToken}`,
                'X-Timestamp': time_stamp,
                'X-AppKey': env.apike,
                'X-SessionToken': sesTok.sessionId
            }
        };

        const res = await CommonServiceLayer.commonRequest ({ options, reqBody });

        ctx.body = res;
        ctx.status = 200;
        return next ();
    } else {
        // Redirect user to logout screen
        ctx.status = 400;
        ctx.message = 'User session invalid. Please try again.';
        return next ();
    }
});

export default router;