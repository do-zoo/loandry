import { models, model, Schema } from "mongoose";

const RFIDSchema: Schema = new Schema({
  rfid: {
    type: String,
    required: true,
    unique: true,
  },
});

export const RFIDModel = models.RFID || model("RFID", RFIDSchema);
