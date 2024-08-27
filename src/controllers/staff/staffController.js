import StaffService from "../../services/staff/staffService.js";
import StaffValidator from "../../validator/staff/staffValidator.js";

class StaffController {
    static async getStaff(req, res) {
        try {
            const { error } = StaffValidator.findValidate(req.query);
            const staff = await StaffService.getStaff(req.query);
            res.json({ data: staff, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async createStaff(req, res) {
        try {
            const { error } = StaffValidator.postValidate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const staff = await StaffService.createStaff(req.body);
            res.json({ data: staff, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateStaff(req, res) {
        try {
            const staff = await StaffService.updateStaff();
            res.json({ data: staff, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deleteStaff(req, res) {
        try {
            const staff = await StaffService.deleteStaff();
            res.json({ data: staff, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default StaffController;


