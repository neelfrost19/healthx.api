
import ActivityLogService from "../../services/activityLog/activityLog.js";

class ActivityLogController {
    static async getActivity(req, res) {
        try {
            
            const activity = await ActivityLogService.getActivity();

            res.json({ data: activity, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default ActivityLogController;


