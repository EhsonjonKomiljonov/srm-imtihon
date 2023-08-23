import { Schema, Types, model } from 'mongoose';

const Group = new Schema(
  {
    direction_ref_id: {
      type: Types.ObjectId,
      ref: 'direction',
      key: '_id',
    },
    gr_number: {
      type: Number,
      required: true,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'begin_date',
      updatedAt: false,
    },
  }
);

export const GroupModel = model('groups', Group);
