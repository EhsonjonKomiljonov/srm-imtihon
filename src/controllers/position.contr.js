import { adminCheck } from '../middlewares/admin.check.js';
import { PositionModel } from '../models/position.model.js';

export class PositionContr {
  async post(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const { pos_name, salary } = req.body;

      if (!pos_name && !salary) throw new Error('Incorrect values!');

      if (!pos_name) throw new Error('Position name is required!');

      if (pos_name.length < 2) throw new Error('Incorrect Position name!');

      if (salary && salary < 10) throw new Error('Incorrect Position salary!');

      const data = await PositionModel.create(req.body);

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

      const { pos_name, salary } = req.body;

      if (!pos_name && !salary) throw new Error('Incorrect values!');

      if (pos_name && pos_name.length < 2)
        throw new Error('Incorrect Position name!');

      if (salary && salary < 10) throw new Error('Incorrect Position salary!');

      const data = await PositionModel.findOneAndUpdate(
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

      const deletedPosition = await PositionModel.findOneAndDelete({
        _id: id,
      });

      return res.send({
        status: 200,
        message: 'deleted',
        deletedPosition,
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
