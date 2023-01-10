import { models, model, Schema } from "mongoose";

const TransactionSchema: Schema = new Schema(
  {
    invoice: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
    customer_id: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TransactionModel =
  models.Transaction || model("Transaction", TransactionSchema);
