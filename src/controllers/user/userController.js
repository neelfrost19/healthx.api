import UserService from "../../services/user/userService.js";
import UserValidator from "../../validator/user/userValidator.js";

class UserController {
    static async getUser(req, res) {
        try {
            const user = await UserService.getUser();
            res.json({ data: user, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async createUser(req, res) {
        try {
            const { error } = UserValidator.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const user = await UserService.createUser(req.body);
            res.json({ data: user, status: "success" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default UserController;


