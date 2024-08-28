import express from "express";
import ActivityLogController from "../controllers/activityLog/activityLogController.js";

const router = express.Router();

router.route("/activity-log").get(ActivityLogController.getActivity);

export default router