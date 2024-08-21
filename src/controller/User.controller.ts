import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/index.js";
class UserController {
  constructor() {}

  // ------------------ CREATE --------------------
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.createUser(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ GET ALL --------------------

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.getUser();
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ GET BY ID --------------------

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.getUserById(req.params.id as any);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ UPDATE --------------------

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.updateUser(
        req.params.id as any,
        req.body,
      );
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  // ------------------ DELETE --------------------

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.deleteUser(req.params.id as any);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
