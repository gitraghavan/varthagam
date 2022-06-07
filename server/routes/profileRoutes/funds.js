// Core Dependencies
import KoaRouter from 'koa-router';

// Dependency Service Layers
import CommonServiceLayer from '../../utilities/services/common.request.layer.service.js';

const router = new KoaRouter ();

router.get ('/summary', async (ctx, next) => {
    if (ctx.request.header.cookie) {
        const reqBody = {};
        const reqCookie = ctx.request.header.cookie;
        const path = '/breezeapi/api/v1/funds';
        const method = 'GET';

        const res = await CommonServiceLayer.reqResGen ({ reqBody, reqCookie, path, method });

        ctx.body = res.Success;
        ctx.status = res.Status;
        return next ();
    }
    // No cookies logout user
    ctx.status = 200;
    return next ();
});

// To-do: Work on setfunds api from breeze
router.post ('allocate', async (ctx, next) => {
    ctx.body = {
        msg: 'Need to configure service'
    }
    ctx.status = res.Status || '200';
    return next ();
})

export default router;
