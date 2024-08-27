import staffModel from "../../models/staff/staffModel.js";
import roleModel from "../../models/role/roleModel.js";


class StaffService {
    static async getStaff(staff) {
        const {search, searchType} = staff;
        console.log(searchType);
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
                searchQuery={email: search};
                break;
        }
        console.log(searchQuery);
        return staffModel.find(searchQuery, undefined, undefined);
    }

    static async createStaff(staff) {
        const {role, ...rest} = staff;
        const roleData = await roleModel.findOne({roleName: role}, undefined, undefined);
        if(!roleData){
            return { status: 500, message: 'role does not exist' };
        }
        const {_id: roleId} = roleData;

        rest.roleId = roleId;

        //return staffModel.create(rest, undefined);
    }
    
    static async updateStaff(id, staff) {
        return staffModel.findByIdAndUpdate(id, staff, undefined);
    }
    
    static async deleteStaff(id) {
        return staffModel.findByIdAndDelete(id, undefined);
    }
}

export default StaffService;
