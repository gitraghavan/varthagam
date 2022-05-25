import UserSessionCollection from "../../collections/session.collection.js";

import TokenService from "./token.security.service.js";

export default class CookieService {
    static cookieStringToJSON (val) {
        const cookieArray = [];
        val.split (';').map ((val) => {
            const finVal = val.split (/=(.*)/s);
            cookieArray [finVal[0]] = finVal[1];
        });
        return cookieArray;
    }

    static async getSessionUsingCookies (resCookie) {
        const cookieVal = this.cookieStringToJSON (resCookie);
        const decryptedValue = TokenService.convertB64Decryt (cookieVal.east);
        
        return await UserSessionCollection.findOne ({ authId: decryptedValue })
            .then ((dbVal) => dbVal );
    }
}
