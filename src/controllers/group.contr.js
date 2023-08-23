import { adminCheck } from '../middlewares/admin.check.js';
import { GroupModel } from '../models/group.model.js';

export class GroupContr {
  async get(req, res) {
    try {
      const id = req.params?.id;
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      let data;

      if (id) {
        data = await GroupModel.findById({ _id: id }).populate(
          'direction_ref_id'
        );
      } else data = await GroupModel.find().populate('direction_ref_id');

      if (JSON.stringify(data) == '[]') throw new Error('Not Found Groups!');

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
  async post(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const { gr_number, direction_ref_id } = req.body;

      if (!gr_number || !direction_ref_id) throw new Error('Incorrect values!');

      const data = await GroupModel.create(req.body);

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

      const { gr_number, direction_ref_id } = req.body;

      if (!gr_number && !direction_ref_id) throw new Error('Incorrect values!');

      const data = await GroupModel.findOneAndUpdate(
        { _id: req.params?.id },
        req.body,
        {
          new: true,
        }
      );

      if (!data) throw new Error('Not Found Group an id: ' + req.params?.id);

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

      const deletedGroup = await GroupModel.findOneAndDelete({
        _id: id,
      });

      return res.send({
        status: 200,
        message: 'deleted',
        deletedGroup,
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
