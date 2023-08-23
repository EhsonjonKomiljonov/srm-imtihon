import { Schema, Types, model } from 'mongoose';
import { PositionModel } from './position.model.js';

const Department = new Schema(
  {
    center_ref_id: {
      type: Types.ObjectId,
      ref: 'centers',
      key: '_id',
    },
    direction_ref_id: {
      type: Types.ObjectId,
      ref: 'direction',
      key: '_id',
    },
    position_ref_id: {
      type: Types.ObjectId,
      ref: 'positions',
      key: '_id',
    },
    dep_name: {
      type: String,
      required: true,
    },
    deleted_at: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  }
);

export const DepartmentModel = model('departments', Department);
