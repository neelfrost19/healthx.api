import mongoose from 'mongoose';
const {Schema, Types} = mongoose;

const StaffSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        roleId: {
            type: Types.ObjectId,
            required: true,
        },
        __v: {
            type: Number,
            select: false,
        },
    },
    {timestamps: true}
);

const Staff = mongoose.model('staff', StaffSchema);

export default Staff;
