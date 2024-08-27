import express from "express";
import StaffController from "../controllers/staff/staffController.js";

const router = express.Router();

router.route("/staff").get(StaffController.getStaff).post(StaffController.createStaff);
router.route("/staff/:id").put(StaffController.updateStaff).delete(StaffController.deleteStaff);

export default router