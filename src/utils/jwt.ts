import jwt from "jsonwebtoken";

import { GenerateJWT } from "../interfaces/index.js";

export const generateToken = (payload: GenerateJWT) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};
