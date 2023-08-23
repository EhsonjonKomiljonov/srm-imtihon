import { adminCheck } from '../middlewares/admin.check.js';
import { DirectionModel } from '../models/direction.model.js';

export class DirectionContr {
  async post(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin == 'string') throw new Error(verifyAdmin);

      const { dir_name, duration, salary } = req.body;

      if (!dir_name && !salary && !duration)
        throw new Error('Incorrect values!');

      if (dir_name.length < 2) throw new Error('Incorrect Direction name!');

      if (duration < 1) throw new Error('Incorrect Direction duration!');

      if (salary < 10) throw new Error('Incorrect Direction salary!');

      const data = await DirectionModel.create(req.body);

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

      const { dir_name, duration, salary } = req.body;

      if (!dir_name && !salary && !duration)
        throw new Error('Incorrect values!');

      if (dir_name && dir_name.length < 2)
        throw new Error('Incorrect Position name!');

      if (salary && salary < 10) throw new Error('Incorrect Position salary!');
      
      if (duration && duration < 1)
        throw new Error('Incorrect Position duration!');

      const data = await DirectionModel.findOneAndUpdate(
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

      const deletedDirection = await DirectionModel.findOneAndDelete({
        _id: id,
      });

      return res.send({
        status: 200,
        message: 'deleted',
        deletedDirection,
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
