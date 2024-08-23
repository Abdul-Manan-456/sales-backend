import { Category } from "../models/index.js";
import Service from "./Service.js";

class CategoryService extends Service {
  constructor() {
    super();
  }

  // ---------------   CREATE --------------

  async createCategory(reqBody: any) {
    try {
      const data = await Category.create({
        ...reqBody,
        createdBy: reqBody.user.id,
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
  async getCategory({ reqBody, reqQuery }: any) {
    console.log("reqquery", reqQuery);
    const { parentCategoryId } = reqQuery;

    if (parentCategoryId && parentCategoryId === "false") {
      reqQuery = { ...reqQuery, parentCategoryId: null };
    }
    try {
      const data = await Category.find({
        ...reqQuery,
        createdBy: reqBody.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .populate("parentCategoryId");

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
  async getCategoryById(id: string) {
    try {
      const data = await Category.findById(id);
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

  // ---------------   GET BY Query --------------
  async getCategoryByQuery(query: object) {
    try {
      const data = await Category.find({ ...query });
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

  // ---------------   DELETE POST --------------
  async deleteCategory(id: string) {
    try {
      const data = await Category.findById(id);
      // if record not found
      if (!data)
        return this.response({
          code: 200,
          message: "No Record Found",
          data: null,
        });
      const deletedData = await Category.findByIdAndDelete(id);
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

  async updateCategory(id: string, reqBody: any) {
    try {
      const data = await Category.findById(id);
      // If record not found
      if (!data)
        return this.response({
          code: 200,
          message: "No Record Found",
          data: null,
        });
      // Updating the blog post
      const updateData = await Category.findByIdAndUpdate(
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

export default new CategoryService();
