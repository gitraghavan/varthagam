import KoaRouter from 'koa-router';

import CommonServiceLayer from '../../utilities/services/common.request.layer.service.js';

const router = new KoaRouter ({
    prefix: 'chart'
});

router.post ('/historicalcharts/:exch/:scrip', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        const reqBody = {
            interval: ctx.request.body.interval || 'day',
            from_date: ctx.request.body.from_date,
            to_date: ctx.request.body.to_date,
            stock_code: ctx.params.scrip.toUpperCase () || 'NIFTY',
            exchange_code: ctx.params.exch.toUpperCase () || 'NSE',
            product_type: ctx.params.type || 'cash',
            expiry_date: ctx.request.body.exp_date,
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