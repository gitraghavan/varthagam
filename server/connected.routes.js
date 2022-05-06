import KoaRouter from 'koa-router';

import authRoute from './routes/authRoutes/sesssion.auth.route.js';

const router = new KoaRouter ();

router.use ('/oauth/', authRoute.routes (), authRoute.allowedMethods ());

export default router;