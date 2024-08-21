import { NextFunction, Request, Response } from "express";

import { CategoryService } from "../services/index.js";

class CategoryController {
  constructor() {}

  // ------------------ CREATE --------------------
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.createCategory(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ GET ALL --------------------

  async getCategory(req: Request, res: Response, next: NextFunction) {
    const reqQuery = req.query;
    try {
      const response = await CategoryService.getCategory(reqQuery);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ GET BY ID --------------------

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.getCategoryById(
        req.params.id as any,
      );
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ GET BY QUERY --------------------

  async getCategoryByQuery(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.getCategoryByQuery(
        req.query as any,
      );
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ UPDATE --------------------

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.updateCategory(
        req.params.id as any,
        req.body,
      );
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ DELETE --------------------

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.deleteCategory(
        req.params.id as any,
      );
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoryController();
