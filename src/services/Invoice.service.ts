import { Request } from "express";
import moment from "moment";
import mongoose from "mongoose";

import { User } from "../models/index.js";
import { Invoice } from "../models/invoice.js";
import Service from "./Service.js";

class InvoiceService extends Service {
  constructor() {
    super();
  }

  // ---------------   CREATE --------------

  async createInvoice(reqBody: any) {
    try {
      // const reqData = reqBody;
      reqBody.date = moment(reqBody.date).format("YYYY-MM-DD");
      console.log("date--------", reqBody);
      const data = await Invoice.create({ ...reqBody });
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
  async getInvoice(req: Request) {
    const reqQuery = req?.query;
    try {
      const data = await Invoice.find(reqQuery)
        .sort({ createdAt: -1 })
        .populate("userId")
        .populate({
          path: "items",
          populate: [
            {
              path: "subCategory",
            },
            {
              path: "category",
            },
          ],
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
  // ---------------   GET Stats/details --------------
  async invoiceUserDetail(req: Request) {
    interface CustomQuery {
      userId?: string;
    }
    const reqQuery: CustomQuery = req?.query;
    const ObjectId = mongoose.Types.ObjectId;
    const userObj = new ObjectId(reqQuery.userId);
    const queryObj: any = {};
    if (reqQuery.userId) queryObj.userId = userObj;

    try {
      // Find the User
      const userPromise = User.findById(reqQuery.userId);
      // Find the invoice
      const invoicePromise = Invoice.find(queryObj)
        .sort({ createdAt: -1 })
        .populate("userId")
        .populate({
          path: "items",
          populate: [{ path: "category" }, { path: "subCategory" }],
        });
      // All stats
      const statPromise = Invoice.aggregate([
        { $match: queryObj },

        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalAmount" },
            totalDue: { $sum: "$dueAmount" },
            totalPaid: { $sum: "$paidAmount" },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
            totalDue: 1,
            totalPaid: 1,
          },
        },
      ]);

      const [invoice, [stat], user] = await Promise.all([
        invoicePromise,
        statPromise,
        userPromise,
      ]);
      return this.response({
        code: 200,
        message: "Get successfully",
        data: {
          user,
          stat,
          invoice,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
  // ---------------   GET BY ID --------------
  async getInvoiceById(id: string) {
    try {
      const data = await Invoice.findById(id)
        .populate("userId")
        .populate({
          path: "items",
          populate: [
            {
              path: "subCategory",
            },
            {
              path: "category",
            },
          ],
        });
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
  async deleteInvoice(id: string) {
    try {
      const data = await Invoice.findById(id);
      // if record not found
      if (!data)
        return this.response({
          code: 200,
          message: "No Record Found",
          data: null,
        });
      const deletedData = await Invoice.findByIdAndDelete(id);
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

  async updateInvoice(id: string, reqBody: any) {
    try {
      const data = await Invoice.findById(id);
      // If record not found
      if (!data)
        return this.response({
          code: 200,
          message: "No Record Found",
          data: null,
        });
      // Updating the blog post
      const updateData = await Invoice.findByIdAndUpdate(
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

export default new InvoiceService();
