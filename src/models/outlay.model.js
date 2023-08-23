import { Schema, Types, model } from 'mongoose';

const Outlay = new Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'inc_time',
      updatedAt: false,
    },
  }
);

export const OutlayModel = model('outlay', Outlay);
