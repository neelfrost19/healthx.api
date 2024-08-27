import mongoose from 'mongoose';
const {Schema} = mongoose;

const UserLoginSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        activeToken: {
            type: String,
            required: true,
        },
        __v: {
            type: Number,
            select: false,
        },
    },
    {timestamps: true}
);

UserLoginSchema.index({userId: 1});

const UserLogin = mongoose.model('user-login', UserLoginSchema);

export default UserLogin;
