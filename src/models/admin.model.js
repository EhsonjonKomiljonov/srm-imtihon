import { Schema, Types, model } from 'mongoose';

const Admin = new Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: 'come_date',
      updatedAt: false,
    },
  }
);

export const AdminModel = model('admin', Admin);
