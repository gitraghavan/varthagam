import crypto from 'crypto';

import env from '../../../configs/config.dev.js';

export default class ChecksumService {
    static constructChecksum (d, ts) {
        const secret = env.apisec;
        const time_stamp = ts;
        const rawChecksum = `${time_stamp}${d}${secret}`;

        return crypto
            .createHash ('sha256')
            .update (rawChecksum)
            .digest ('hex');
    }
}
