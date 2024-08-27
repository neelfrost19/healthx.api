import express from "express";
import StaffController from "../controllers/staff/staffController.js";

const router = express.Router();

router.route("/staff").get(StaffController.getStaff).post(StaffController.createStaff).put(StaffController.createStaff).delete(StaffController.createStaff);

export default router