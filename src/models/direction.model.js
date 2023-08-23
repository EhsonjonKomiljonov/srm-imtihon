import { Schema, Types, model } from 'mongoose';

const Direction = new Schema(
  {
    dir_name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    salary: {
      type: Number,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'start_date',
      updatedAt: false,
    },
  }
);

export const DirectionModel = model('direction', Direction);
