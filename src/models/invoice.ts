import mongoose from "mongoose";
const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        category: {
          type: Schema.Types.ObjectId,
          ref: "Category",
        },
        subCategory: {
          type: Schema.Types.ObjectId,
          ref: "Category",
        },
        quantity: {
          type: Number,
          min: 1,
        },
        price: {
          type: Number,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidAmount: {
      type: Number,
      min: 0,
    },
    dueAmount: {
      type: Number,
      min: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
