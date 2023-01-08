import { models, model, Schema } from "mongoose";

const WeightSchema: Schema = new Schema({
  weight: {
    type: String,
    required: true,
    unique: true,
  },
});

export const WeightModel = models.Weight || model("Weight", WeightSchema);
