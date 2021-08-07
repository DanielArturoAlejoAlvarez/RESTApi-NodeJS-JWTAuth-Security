import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    price: Number,
    stock: Number,
    category: {
      type: String,
      enum: ["COMPUTER", "TABLET", "SMARTPHONE", "ACCESSORIES"],
      default: "COMPUTER",
    },
    imgURL: {
      type: String,
      maxLength: 512,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productSchema);
