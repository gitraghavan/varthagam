import KoaRouter from 'koa-router';

import CommonServiceLayer from '../../utilities/services/common.request.layer.service.js';

const router = new KoaRouter ({
    prefix: 'chart'
});

router.get ('/historicalcharts', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        const reqBody = {
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
        };
        const reqCookie = ctx.request.header.cookie;
        const path = '/breezeapi/api/v1/historicalcharts';
        const method = 'GET';

        const res = await CommonServiceLayer.reqResGen ({ reqBody, reqCookie, path, method });

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