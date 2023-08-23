import { Schema, Types, model } from 'mongoose';

const User = new Schema(
  {
    position_ref_id: {
      type: Types.ObjectId,
      ref: 'positions',
      key: '_id',
    },
    group_ref_id: {
      type: Types.ObjectId,
      ref: 'groups',
      key: '_id',
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    contact: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      required: true,
    },
    left_date: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'come_date',
      updatedAt: false,
    },
  }
);

export const UserModel = model('users', User);
