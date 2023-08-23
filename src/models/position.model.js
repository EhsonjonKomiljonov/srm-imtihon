import { Schema, Types, model } from 'mongoose';

const Position = new Schema({
  pos_name: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    default: 0,
    nullable: true,
  },
  deleted_at: {
    type: Date,
  },
});

export const PositionModel = model('positions', Position);
