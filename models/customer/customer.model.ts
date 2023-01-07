import { models, model, Schema } from "mongoose";

const CustomerSchema: Schema = new Schema({
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
  gender: {
    type: String,
  },
  birth: {
    type: String,
  },
  place_of_birth: {
    type: String,
  },
  date_of_birth: {
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
});

export const CustomerModel =
  models.Customer || model("Customer", CustomerSchema);
