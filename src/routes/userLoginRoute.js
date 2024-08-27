import express from "express";
import UserLoginController from "../controllers/user/userLoginController.js";

const router = express.Router();

router.route("/user-login").post(UserLoginController.getUser);

export default router