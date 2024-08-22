import { User } from "../models/index.js";
import Service from "./Service.js";
class UserService extends Service {
  constructor() {
    super();
  }

  // ---------------   CREATE --------------

  async createUser(reqBody: any) {
    try {
      const data = await User.create({
        ...reqBody,
        userCreatedBy: reqBody?.user.id,
      });
      return this.response({
        code: 201,
        message: "Created Successfully",
        data: data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // ---------------   GET ALL --------------
  async getUser(reqBody: any) {
    try {
      const data = await User.find({ userCreatedBy: reqBody?.user?.id }).sort({
        createdAt: -1,
      });

      return this.response({
        code: 200,
        message: "Get successfully",
        data: data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // ---------------   GET BY ID --------------
  async getUserById(id: string) {
    try {
      const data = await User.findById(id);
      // if record not found
      if (!data)
        return this.response({
          code: 200,
          message: "No Record Found",
          data: null,
        });
      // if the record found
      else
        return this.response({
          code: 200,
          message: "Get successfully",
          data: data,
        });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // ---------------   DELETE USER --------------
  async deleteUser(id: string) {
    try {
      const data = await User.findById(id);
      // if record not found
      if (!data)
        return this.response({
          code: 200,
          message: "No Record Found",
          data: null,
        });
      const deletedData = await User.findOneAndDelete({ _id: id });
      // if the record found
      return this.response({
        code: 200,
        message: "Delete successfully",
        data: deletedData,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // ---------------   UPDATE POST --------------

  async updateUser(id: string, reqBody: object) {
    try {
      const data = await User.findById(id);
      // If record not found
      if (!data)
        return this.response({
          code: 200,
          message: "No Record Found",
          data: null,
        });
      // Updating the blog post
      const updateData = await User.findByIdAndUpdate(
        id,
        { ...reqBody },
        { new: true },
      );
      return this.response({
        code: 200,
        message: "Update successfully",
        data: updateData,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new UserService();
