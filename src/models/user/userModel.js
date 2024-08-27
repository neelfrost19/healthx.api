import mongoose from 'mongoose';
const {Schema} = mongoose;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        userName: {
            type: String,
            required: true,
        },
        password: {
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

const User = mongoose.model('user', UserSchema);

export default User;
