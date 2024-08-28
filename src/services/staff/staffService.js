import staffModel from "../../models/staff/staffModel.js";
import roleModel from "../../models/role/roleModel.js";

class StaffService {
    static async getStaff(staff) {
        const {search, searchType} = staff;
        let searchQuery = {};
        switch (searchType) {
            case "email":
                searchQuery = {email: search};
                break;
            case "firstName":
                searchQuery = {firstName: search};
                break;
            case "lastName":
                searchQuery = {lastName: search};
                break;
            case "department":
                searchQuery = {department: search};
                break;
            case "gender":
                searchQuery = {gender: search};
                break;
            default:
                searchQuery={};
                break;
        }
        const staffData = await staffModel.find(searchQuery, undefined, undefined);
        if (!staffData.length) {
            return { status: 500, message: 'staff data does not exist' };
        }
        let newStaffData =[];
        for (const staff of staffData) {
            const {_id, roleId, countryCode, phone, firstName, lastName, gender, department, email} = staff;
            const roleData = await roleModel.findById(roleId, undefined, undefined);
            const {roleName} = roleData;
            newStaffData.push({_id, countryCode, phone, firstName, lastName, gender, department, email, role: roleName});
        }
        return newStaffData;
    }

    static async createStaff(staff) {
        const {role, ...rest} = staff;
        const roleData = await roleModel.findOne({roleName: role}, undefined, undefined);
        if(!roleData){
            return { status: 500, message: 'role does not exist' };
        }
        const {_id: roleId} = roleData;

        rest.roleId = roleId;

        return staffModel.create(rest, undefined);
    }
    
    static async updateStaff(id, staff) {
        const {role, ...rest} = staff;
        if(role){
            const roleData = await roleModel.findOne({roleName: role}, undefined, undefined);
            if(!roleData){
                return { status: 500, message: 'role does not exist' };
            }
            const {_id: roleId} = roleData;
            rest.roleId = roleId;
        }
        return staffModel.findByIdAndUpdate(id, rest, undefined);
    }
    
    static async deleteStaff(id) {
        return staffModel.findByIdAndDelete(id, undefined);
    }
}

export default StaffService;
