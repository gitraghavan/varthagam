import http from 'http';
import Koa from 'koa';
import KoaBody from 'koa-body';

import MongooseClient from 'mongoose';

import env from './configs/config.dev.js';
import connectedRoutes from './connected.routes.js';

const app = new Koa ();

MongooseClient.connect ('mongodb://localhost/varthagam');
MongooseClient.connection
    .once ('open', ()=> console.log ('Connection opened for Mongo DB with Mongoose Client.'))
    .on ('error', (error) => {
        console.log ('Error: ', error);
    });

app.use (KoaBody ());
app.use (connectedRoutes.routes (), connectedRoutes.allowedMethods ());

const port = env.port;

http.createServer (app.callback ()).listen (port, () => {
    console.log (`Application running on http://localhost:${env.port}`);
});
