import MongooseClient from 'mongoose';

const Schema = MongooseClient.Schema;

const sessionLogsSchema = new Schema ({
    sessionStartTime: { type: Date, default: Date.now },
    sessionEndTime: Date,
    tId: String,
    userAgent: String,
    hostName: String
});

const SessionLogsCollection = MongooseClient.model ('sessionlogs', sessionLogsSchema);

export default SessionLogsCollection;
