import { Router } from "express";

import AuthController from "../controller/Auth.controller.js";
import { validator } from "../middleware/index.js";
import {
  forgotPasswordValidator,
  loginUserValidator,
  resetPasswordValidator,
} from "../validations/user/Auth.validator.js";
export const router: Router = Router();

router.get("/", (req, res) => {
  res.send("Hello World from auth");
});
router.post("/", AuthController.createUser);
router.post("/login", validator(loginUserValidator), AuthController.login);
router.post(
  "/forgot-password",
  validator(forgotPasswordValidator),
  AuthController.forgotPassword,
);
router.post(
  "/reset-password",
  validator(resetPasswordValidator),
  AuthController.resetPassword,
);

router.post(
  "/change-password",
  validator(resetPasswordValidator),
  AuthController.changePassword,
);
