import { NextFunction, Request, Response } from "express";

import { AuthService } from "../services/index.js";

class UserController {
  constructor() {}
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.createUser(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.login(req.body);
      response.code === 200 &&
        res.cookie("token", response.data.token, {
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });

      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.forgotPassword(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.resetPassword(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AuthService.changePassword(req.body);
      return res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
