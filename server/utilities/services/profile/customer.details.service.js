import CommonServiceLayer from "../common.request.layer.service.js";

export default class CustomerDetailsService {
    static async getDematHoldings (c) {
        const reqBody = {};
        const reqCookie = c;
        const path = '/breezeapi/api/v1/dematholdings';
        const method = 'GET';

        return await CommonServiceLayer.reqResGen ({ reqBody, reqCookie, path, method });
    }

    static async getPortfolioHoldings (rb) {
        const reqBody = {
            exchange_code: rb.ec,
            from_date: '',
            to_date: '',
            stock_code: rb.sc || 'AXIBAN',
            portfolio_type: ''
        };

        const reqCookie = rb.c;
        const path = '/breezeapi/api/v1/portfolioholdings';
        const method = 'GET';

        return await CommonServiceLayer.reqResGen ({ reqBody, reqCookie, path, method });
    }
}
