import { Schema, Types, model } from 'mongoose';

const Check = new Schema(
  {
    group_ref_id: {
      type: Types.ObjectId,
      ref: 'groups',
      key: '_id',
    },
    user_ref_id: {
      type: Types.ObjectId,
      ref: 'users',
      key: '_id',
      optional: true,
    },
    not_in_class: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'add_date',
      updatedAt: false,
    },
  }
);

export const CheckModel = model('checks', Check);
