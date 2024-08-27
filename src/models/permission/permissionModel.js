import mongoose from 'mongoose';
const {Schema} = mongoose;

const PermissionSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        createService: {
            type: Boolean,
            required: true,
            default: false
        },
        readService: {
            type: Boolean,
            required: true,
            default: false
        },
        updateService: {
            type: Boolean,
            required: true,
            default: false
        },
        deleteService: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {timestamps: true}
);

const Permission = mongoose.model('permission', PermissionSchema);

export default Permission;
