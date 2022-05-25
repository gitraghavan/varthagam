import https from 'https';

export default class CommonServiceLayer {
    static commonRequest (o) {
        return new Promise (resolve => {
            const req = https.request (o.options, (res) => {
                let resData = '';
                res.on ('data', (d) => {
                    resData += d;
                });
        
                res.on ('end', async () => {
                    resolve (JSON.parse (resData));
                });
            });
        
            req.on ('error', (err) => {
                reject (err);
            });
        
            if (o.reqBody) {
                req.write (o.reqBody);
            }
            req.end ();
        });
    };
}
