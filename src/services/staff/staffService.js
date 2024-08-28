import staffModel from "../../models/staff/staffModel.js";
import roleModel from "../../models/role/roleModel.js";
import {StaffAggregation} from "../../utils/staffAggregation.js";

class StaffService {
    static async getStaff(staff) {
        try{
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
        catch(error){
            return {status: 500, message: error.message};
        }
    }

    static async createStaff(staff) {
        try{
            const {role, ...rest} = staff;
            const roleData = await roleModel.findOne({roleName: role}, undefined, undefined);
            if(!roleData){
                return { status: 500, message: 'role does not exist' };
            }
            const {_id: roleId} = roleData;

            rest.roleId = roleId;

            const data = await staffModel.create(rest, undefined);

            return {status: 200, data};
        }
        catch(error){
            return {status: 500, message: error.message };
        }
    }
    
    static async updateStaff(id, staff, user) {
        try{
            const {role, ...rest} = staff;
            if(role){
                const roleData = await roleModel.findOne({roleName: role}, undefined, undefined);
                if(!roleData){
                    return { status: 500, message: 'role does not exist' };
                }
                const {_id: roleId} = roleData;
                rest.roleId = roleId;
            }

            const staffAggregationData = await StaffAggregation.get(id);

            if(!(user[0].role[0].authorityLevel > staffAggregationData[0].role[0].authorityLevel)){
                return { status: 500, message: 'Authority Level low' };
            }

            const data = await staffModel.findByIdAndUpdate(id, rest, undefined);
            return { status: 200, data};
        }
        catch (error) {
            return { status: 500, message: error.message };
        }

    }
    
    static async deleteStaff(id, user) {
        try{
            const staffAggregationData = await StaffAggregation.get(id);

            if(!(user[0].role[0].authorityLevel > staffAggregationData[0].role[0].authorityLevel)){
                return { status: 500, message: 'Authority Level low' };
            }

            const data =  staffModel.findByIdAndDelete(id, undefined);

            return {status: 200, data};
        }
        catch (error){
            return {status: 500, message: error.message };
        }
    }
}

export default StaffService;
