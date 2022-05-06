import UserSession from '../../collections/session.collection.js';

const currentSession = async (d) => {
    const sessionData = {
        authId: d.API_Session,
        sessionId: 123456789,
        userId: d.user_id
    };
    UserSession.findOneAndUpdate ({ userId: d.user_id }, sessionData, { upsert: true }, (err, doc, res) => {
        if (err) return err;
        if (doc) return doc;
        if (res) return res;
    });
}

export default currentSession;
