import UserSessionCollection from '../../collections/session.collection.js';
import SessionLogsCollection from '../../collections/session.logs.collection.js';

// Save session only at login
export default class SessionService {
    static async createSession (d) {
        const logData = {
            tId: d.tidToken,
            userAgent: d.userAgent,
            hostName: d.hostName
        };

        return SessionLogsCollection.findOneAndUpdate ({ tId: d.tidToken }, logData, { new: true, upsert: true });
    };

    static async saveSession (d) {
        const sessionData = {
            authId: d.API_Session,
            userId: d.user_id
        };

        return UserSessionCollection.findOneAndUpdate ({ userId: d.user_id }, sessionData, { new: true, upsert: true });
    };

    // Update session after login
    static async updateSession (d) {
        return UserSessionCollection.findOneAndUpdate ({ userId: d.user_id }, { sessionId: d }, { new: true, upsert: true });
    };
}
