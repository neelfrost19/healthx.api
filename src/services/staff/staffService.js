import staffModel from "../../models/staff/staffModel.js";


class StaffService {
    static async getStaff(id) {
        return staffModel.findById(id, undefined, undefined);
    }

    static async createStaff(staff) {
        return staffModel.create(staff, undefined);
    }
    
    static async updateStaff(id, staff) {
        return staffModel.findByIdAndUpdate(id, staff, undefined);
    }
    
    static async deleteStaff(id) {
        return staffModel.findByIdAndDelete(id, undefined);
    }
}

export default StaffService;
