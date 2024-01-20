import { Router } from "express";
import {
  get_current_user,
  login,
  logout,
  register,
} from "../controllers/auth_controller.js";
import {
  validate_login_inputs,
  validate_register_inputs,
} from "../middlewares/input_validator.js";
import { authenticate_user } from "../middlewares/authentication.js";

const router = Router();

router.route("/register").post(validate_register_inputs, register);
router.route("/login").post(validate_login_inputs, login);
router.route("/logout").post(authenticate_user, logout);
router.route("/get_current_user").get(authenticate_user, get_current_user);

export default router;
