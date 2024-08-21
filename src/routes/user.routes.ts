import { Router } from "express";

import UserController from "../controller/User.controller.js";
// import { validator } from "../middleware";
export const router: Router = Router();

router.post("/", UserController.createUser);
// router.post("/", validator(createCategoryJoi), UserController.createUser);
router.get("/", UserController.getUser);
router.get("/:id", UserController.getUserById);

router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
