import { DepartmentModel } from '../models/department.model.js';
import { adminCheck } from '../middlewares/admin.check.js';
import { DirectionModel } from '../models/direction.model.js';
import { GroupModel } from '../models/group.model.js';
import { PositionModel } from '../models/position.model.js';

export class DepartmentContr {
  async get(req, res) {
    try {
      const id = req.params?.id;
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      let data;

      if (id) {
        data = await DepartmentModel.findById({ _id: id })
          .populate('direction_ref_id')
          .populate('position_ref_id');
      } else if (req.query?.positions && !req.query?.directions) {
        const { positions } = req.query;
        data = await PositionModel.findOne({ pos_name: positions });
      } else if (!req.query?.positions && req.query?.directions) {
        const { directions } = req.query;
        data = await DirectionModel.findOne({ dir_name: directions });
      } else
        data = await DepartmentModel.find()
          .populate('direction_ref_id')
          .populate('position_ref_id');

      if (!data) throw new Error('Not Found department!');

      return res.send({
        status: 200,
        message: 'success',
        data,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async getDirection(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const direct = req.params?.direct;
      const group_id = req.params?.group_id;

      const getGroup = await GroupModel.findById({ _id: group_id });

      if (!getGroup) throw new Error('Not Found Group');

      await getGroup.populate({
        path: 'direction_ref_id',
        match: { dir_name: direct },
      });

      return res.status(200).send({
        status: 200,
        message: 'success',
        data: getGroup,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async post(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const { center_ref_id, dep_name, position_ref_id, direction_ref_id } =
        req.body;

      if (!dep_name || !center_ref_id) throw new Error('Incorrect values!');

      if (!direction_ref_id && !position_ref_id)
        throw new Error(
          'Department must have one of position_ref_id direction_ref_ids!'
        );

      if (dep_name.length < 1) throw new Error('Incorrect department name!');

      const data = await DepartmentModel.create(req.body);

      return res.send({
        status: 200,
        message: 'success',
        data,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async put(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const { center_ref_id, dep_name, position_ref_id, direction_ref_id } =
        req.body;

      if (!dep_name && !center_ref_id && !direction_ref_id && !position_ref_id)
        throw new Error('Incorrect values!');

      if (dep_name && dep_name.length < 1)
        throw new Error('Incorrect department name!');

      const data = await DepartmentModel.findOneAndUpdate(
        { _id: req.params?.id },
        req.body,
        {
          new: true,
        }
      );

      if (!data)
        throw new Error('Not Found Department an id: ' + req.params?.id);

      return res.send({
        status: 200,
        message: 'success',
        data,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async delete(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);
      
      const { id } = req.params;

      const deletedDepartment = await DepartmentModel.findOneAndDelete({
        _id: id,
      });

      return res.send({
        status: 200,
        message: 'deleted',
        deletedDepartment,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
}
