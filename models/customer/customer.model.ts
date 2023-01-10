import { models, model, Schema } from "mongoose";

const CustomerSchema: Schema = new Schema(
  {
    rfid: {
      type: String,
      required: true,
      unique: true,
    },
    nisn: {
      type: String,
    },
    name: {
      type: String,
    },
    sex: {
      type: String,
    },
    place_of_birth: {
      type: String,
    },
    birth_date: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    rfid_used: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CustomerModel =
  models.Customer || model("Customer", CustomerSchema);
