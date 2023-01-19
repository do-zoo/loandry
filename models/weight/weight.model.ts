import { models, model, Schema } from 'mongoose';

const WeightSchema: Schema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WeightModel = models.Weight || model('Weight', WeightSchema);
