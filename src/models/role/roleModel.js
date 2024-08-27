import mongoose from 'mongoose';
const {Schema} = mongoose;

const RoleSchema = new Schema(
    {
        roleName: {
            type: String,
            unique: true,
            required: true
        },
        roleDescription: {
            type: String,
            required: true,
            default: '',
        },
        permissionId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        AuthorityLevel: {
            type: Number,
            required: true,
        }
    },
    {timestamps: true}
);

const Role = mongoose.model('role', RoleSchema);

export default Role;
