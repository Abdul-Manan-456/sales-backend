import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { publicRotues } from "../config/publicRoutes.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // ---------------  CHECK FOR PUBLIC ROUTES --------------
    const reqUrl = req.originalUrl;
    const reqMethod = req.method.toUpperCase();
    for (let i = 0; i < publicRotues.length; i++) {
      const publicRoute = publicRotues[i];
      if (publicRoute.url === reqUrl && publicRoute.method === reqMethod) {
        return next();
      }
    }
    // ------------- CHECK FOR AUTENTICATED ROUTES -----------
    // get token from cookies
    const token = req.cookies["auth-token"];
    console.log("token--------", token);
    console.log("cookies---------", req.cookies);
    if (!token) {
      return res.status(401).json({ message: "No Token, Unauthorized Access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.body.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
};
