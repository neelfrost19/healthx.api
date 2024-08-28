import mongoose from 'mongoose';
const {Schema} = mongoose;

const ActivityLogSchema = new Schema(
    {
        actionTaker: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        actionTakenOn: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
    },
    {timestamps: true}
);

const AuditLog = mongoose.model('activity-log', ActivityLogSchema);

export default AuditLog;
