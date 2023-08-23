import { Schema, Types, model } from 'mongoose';

const Incomes = new Schema(
  {
    user_ref_id: {
      type: Types.ObjectId,
      ref: 'users',
      key: '_id',
    },
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

export const IncomesModel = model('incomes', Incomes);
