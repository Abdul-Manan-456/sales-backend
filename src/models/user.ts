import mongoose from "mongoose";

import { Invoice } from "./invoice.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      // unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    resetPasswordToken: {
      type: String,
      trim: true,
    },
    cellNo: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    userCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

userSchema.pre("findOneAndDelete", async function (next) {
  try {
    console.log("pre hook called");
    const userId = this.getQuery()["_id"];
    await Invoice.deleteMany({ userId });
    next();
  } catch (err: any) {
    console.log("error-----------", err);
    next(err);
  }
});
export const User = mongoose.model("User", userSchema);
