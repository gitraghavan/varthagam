import MongooseClient from 'mongoose';

const Schema = MongooseClient.Schema;

const sessionSchema = new Schema ({
    authId: String,
    sessionId: Number,
    userId: String
});

const UserSession = MongooseClient.model ('usersession', sessionSchema);

export default UserSession;
