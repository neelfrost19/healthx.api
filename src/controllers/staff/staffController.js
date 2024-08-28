import StaffService from "../../services/staff/staffService.js";
import StaffValidator from "../../validator/staff/staffValidator.js";
import ActivityLogService from "../../services/activityLog/activityLog.js";

class StaffController {
    static async getStaff(req, res) {
        try {
            const {userName} = req.fullUserData;

            const { error } = StaffValidator.findValidate(req.query);

            // if (error) {
            //     return res.status(400).json({ error: error.details[0].message });
            // }

            const staff = await StaffService.getStaff(req.query);

            await ActivityLogService.createLog({
                actionTaker: userName,
                action: 'StaffRead'
            })

            res.json({ data: staff, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async createStaff(req, res) {
        try {
            const {userName} = req.fullUserData;

            const { error } = StaffValidator.postValidate(req.body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const staff = await StaffService.createStaff(req.body);

            const {firstName, lastName} = req.body;

            await ActivityLogService.createLog({
                actionTaker: userName,
                action: 'StaffCreate',
                actionTakenOn: `${firstName} ${lastName}`,
            })

            res.json({ data: staff, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async updateStaff(req, res) {
        try {
            const {userName} = req.fullUserData;

            const staff = await StaffService.updateStaff(req.params.id, req.body);

            const {firstName, lastName} = req.body;

            await ActivityLogService.createLog({
                actionTaker: userName,
                action: 'StaffUpdate',
                actionTakenOn: `${firstName} ${lastName}`,
            })

            res.json({ data: staff, status: "success" });

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async deleteStaff(req, res) {
        try {
            const {userName} = req.fullUserData;

            const staff = await StaffService.deleteStaff(req.params.id);
            const {firstName, lastName} = staff;

            await ActivityLogService.createLog({
                actionTaker: userName,
                action: 'StaffDelete',
                actionTakenOn: `${firstName} ${lastName}`,
            })

            res.json({ data: staff, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default StaffController;


