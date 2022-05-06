import KoaRouter from 'koa-router';

import env from '../../configs/config.dev.js';
import dbSession from '../../utilities/services/auth/session.crud.service.js';

const router = new KoaRouter ({
    prefix: 'v1'
});

router.get ('/initiateicicilogin', async (ctx, next) => {
    // To-do
    // Get Data and Time and create a log with other neccessary details
    // setting cookie for Vathagam App Key (vak)
    ctx.status = 200;
    ctx.cookies.set ('aurl', 'https://api.icicidirect.com/apiuser/login', { httpOnly: false })
    ctx.cookies.set ('vak', env.test_apke, { httpOnly: false });
    ctx.body = {
        msg: 'Auth initiated'
    };
    next ();
});

router.post ('/authenticated/redirect', async (ctx, next) => {
    dbSession (ctx.request.body);
    ctx.status = 302;
    ctx.redirect ('http://localhost:4200/icici/dashboard');
    next ();
});

export default router;
