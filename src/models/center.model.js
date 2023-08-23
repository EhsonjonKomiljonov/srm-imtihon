import { Schema, Types, model } from 'mongoose';

const Center = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    close_date: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'open_date',
      updatedAt: false,
    },
  }
);


export const CenterModel = model('centers', Center);
