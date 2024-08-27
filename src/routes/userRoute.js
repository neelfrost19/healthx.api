import express from "express";
import UserController from "../controllers/user/userController.js";

const router = express.Router();

router.route("/user").get(UserController.getUser).post(UserController.createUser);

export default router