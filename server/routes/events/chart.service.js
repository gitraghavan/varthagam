import KoaRouter from 'koa-router';

import CommonServiceLayer from '../../utilities/services/common.request.layer.service.js';

const router = new KoaRouter ({
    prefix: 'chart'
});

router.get ('/historicalcharts/:exch/:scrip', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        const reqBody = {
            interval: ctx.params.interval || 'day',
            from_date: '2022-07-01T07:00:00.000Z',
            to_date: '2022-07-11T07:00:00.000Z',
            stock_code: ctx.params.scrip.toUpperCase () || 'NIFTY',
            exchange_code: ctx.params.exch.toUpperCase () || 'NSE',
            product_type: ctx.params.type || 'cash',
            expiry_date: '2022-06-14T07:00:00.000Z',
            right: ctx.params.right || "",
            strike_price: ctx.params.strikePrice || "0"
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