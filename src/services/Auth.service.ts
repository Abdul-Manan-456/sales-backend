import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

import { CreateUser, LoginUser } from "../interfaces/index.js";
import { User } from "../models/index.js";
import { generateToken } from "../utils/index.js";
import { forgotPasswordMail } from "../utils/mail.js";
import Service from "./Service.js";
class AuthService extends Service {
  constructor() {
    super();
  }

  // --------------   CREATE USER ----------
  async createUser(reqBody: CreateUser) {
    const { name, email, password, role } = reqBody;

    try {
      // Check if the email already exists
      const existingUser = await User.findOne({
        email: reqBody.email,
      });
      if (existingUser) {
        return this.response({
          code: 409,
          message: "Already have an account. Please login",
          data: null,
        });
      }

      // HASHED PASSWORD
      const hashedPwd = await bcrypt.hash(password, 10);
      const userData = {
        name,
        email,
        role,
        password: hashedPwd,
      };
      const userCreate = await User.create(userData);
      return this.response({
        code: 201,
        message: "User Created Successfully",
        data: userCreate,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
  // ------------- LOGIN USER -----------------
  async login(reqBody: LoginUser) {
    const { email, password } = reqBody;
    const respMessage = {
      code: 400,
      message: "Invalid Credentials",
      data: null,
    };

    try {
      //
      // Validate Request Body
      if (!email || !password)
        return this.response({
          code: 400,
          message: "Email and Password is required",
          data: null,
        });
      const userLogin = await User.findOne({
        email: email,
      });
      //
      // if the user not exist
      if (!userLogin) return this.response(respMessage);
      //
      // Check for hashed password
      const isMatch = await bcrypt.compare(password, userLogin.password!);
      if (!isMatch) return this.response(respMessage);

      //
      // Generate JWT Token
      const token = generateToken({
        id: userLogin.id,
        name: userLogin.name,
        email: userLogin.email!,
        role: userLogin.role,
      });
      return this.response({
        code: 200,
        message: "Login Successful",
        data: { token, user: userLogin },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // --------------   FORGOT PASSWORD ----------------

  async forgotPassword(reqBody: { email: string }) {
    const { email } = reqBody;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return this.response({
          code: 409,
          message:
            "We couldn't find a user with this email in our database. Please provide the correct email address.",
          data: null,
        });
      }

      const resetToken = randomUUID();

      // Save the reset token to the user's document in the database
      user.resetPasswordToken = resetToken;
      await user.save();

      await forgotPasswordMail({ email, token: resetToken, name: user.name });
      return this.response({
        code: 200,
        message:
          "An email has been sent to you. Please check your inbox to verify your email address.",
        data: null,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // --------------   RESET PASSWORD ----------

  async resetPassword(reqBody: {
    resetPasswordToken: string;
    password: string;
  }) {
    const { resetPasswordToken, password } = reqBody;
    try {
      // Find the user with the given reset token
      const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
      });

      if (!user) {
        return this.response({
          code: 409,
          message: "Invalid reset token",
          data: null,
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update the user's password and remove the reset token
      user.password = hashedPassword;
      user.resetPasswordToken = "";
      await user.save();

      return this.response({
        code: 201,
        message: "Password reset successfully",
        data: null,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
  // --------------   CHANGE PASSWORD ----------
  async changePassword(reqBody: {
    oldPassword: string;
    newPassword: string;
    userId: string;
  }) {
    const { oldPassword, newPassword, userId } = reqBody;
    try {
      // Find the user with the given ID
      const user = await User.findById(userId);
      if (!user) {
        return this.response({
          code: 400,
          message: "User not found",
          data: null,
        });
      }

      // Check if the old password is correct
      const isMatch = true;
      // const isMatch = await bcrypt.compare(oldPassword);
      if (!isMatch) {
        return this.response({
          code: 400,
          message: "Password is incorrect",
          data: null,
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      return this.response({
        code: 201,
        message: "Password changed successfully",
        data: null,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new AuthService();
