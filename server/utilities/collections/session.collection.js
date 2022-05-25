import MongooseClient from 'mongoose';

const Schema = MongooseClient.Schema;

const sessionSchema = new Schema ({
    sessionStartTime: { type: Date, default: Date.now },
    sessionEndTime: Date,
    authId: String,
    sessionId: String,
    userId: String,
    tId: String,
    hostName: String
});

const UserSessionCollection = MongooseClient.model ('usersession', sessionSchema);

export default UserSessionCollection;
