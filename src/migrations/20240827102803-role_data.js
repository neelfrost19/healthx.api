
import Permission from '../models/permission/permissionModel.js';

export async function up(db, client) {
    const rolesData = [
        {
            roleName: 'Admin',
            roleDescription: 'Administrator with full administration access',
            authorityLevel: 7,
            permissionName: 'FULL_ACCESS'
        },
        {
            roleName: 'Moderator',
            roleDescription: 'User with moderate administration access',
            authorityLevel: 6,
            permissionName: 'MODERATE_ACCESS'
        },
        {
            roleName: 'Sub-Moderator',
            roleDescription: 'User with limited administration access',
            authorityLevel: 5,
            permissionName: 'LIMITED_ACCESS'
        },
        {
            roleName: 'Doctor',
            roleDescription: 'User with read access',
            authorityLevel: 4,
            permissionName: 'READ_ACCESS'
        },
        {
            roleName: 'Nurse',
            roleDescription: 'User with read access',
            authorityLevel: 3,
            permissionName: 'READ_ACCESS'
        },
        {
            roleName: 'Receptionist',
            roleDescription: 'User with read access',
            authorityLevel: 2,
            permissionName: 'READ_ACCESS'
        },
        {
            roleName: 'Guard',
            roleDescription: 'User with read access',
            authorityLevel: 1,
            permissionName: 'READ_ACCESS'
        },
    ];
    const rolePromises = rolesData.map(async (role) => {
        const permission = await Permission.find({ name: 'READ_ACCESS' }, undefined, undefined);
        console.log('permission', permission);
        if (!permission[0]) {
            throw new Error(`Permission with name ${role.permissionName} not found`);
        }

        return {
            roleName: role.roleName,
            roleDescription: role.roleDescription,
            permissionId: permission[0]._id,
            AuthorityLevel: role.authorityLevel
        };
    });

    const roles = await Promise.all(rolePromises);
    await db.collection('roles').insertMany(roles);
}

export async function down(db, client) {
    await db.collection('roles').deleteMany({});
}
