import { models, model, Schema } from "mongoose";

const ProductSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = models.Product || model("Product", ProductSchema);
