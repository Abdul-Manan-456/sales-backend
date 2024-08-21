import { Router } from "express";

import CategoryController from "../controller/Category.controller.js";
import { validator } from "../middleware/index.js";
import { createCategoryJoi } from "../validations/category/category.validator.js";
export const router: Router = Router();

router.post(
  "/",
  validator(createCategoryJoi),
  CategoryController.createCategory,
);
router.get("/", CategoryController.getCategory);
router.get("/:id", CategoryController.getCategoryById);

router.patch(
  "/:id",
  validator(createCategoryJoi),
  CategoryController.updateCategory,
);
router.delete("/:id", CategoryController.deleteCategory);
