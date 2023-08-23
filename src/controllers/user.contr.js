import { checkToken } from '../middlewares/token.check.js';
import { UserModel } from '../models/user.model.js';
import { AdminModel } from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import { adminCheck } from '../middlewares/admin.check.js';
const SEC_KEY = process.env.SEC_KEY;

export class UserContr {
  // POST ADMINNI SIZ UCHUN QO'SHIB QOYDIM 😉
  async postAdmin(req, res) {
    try {
      const data = await AdminModel.create(req.body);

      const token = jwt.sign(
        {
          id: data._id,
          contact: data.contact,
          email: data.email,
        },
        SEC_KEY,
        {
          expiresIn: '5 days',
        }
      );

      return res.send({
        status: 200,
        message: 'success',
        token: token,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async loginAdmin(req, res) {
    try {
      const { email, contact } = req.body;

      if (!email || !contact) throw new Error('Incorrect values!');

      if (email.length < 3 || email.length > 120)
        throw new Error('Incorrect user email!');

      if (contact.length < 9 || contact.length > 13)
        throw new Error('Incorrect user contact!');

      const data = await AdminModel.findOne({
        email: email,
        contact: contact,
      });

      if (!data) throw new Error('Not Found admin');

      const token = jwt.sign(
        {
          id: data._id,
          contact: data.contact,
          email: data.email,
        },
        SEC_KEY,
        {
          expiresIn: '5 days',
        }
      );

      return res.send({
        status: 200,
        message: 'success',
        token: token,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async getUser(req, res) {
    try {
      const verifyAdmin = await adminCheck(req, res);

      if (typeof verifyAdmin != 'string') {
        let data;
        if (req.params?.id) {
          data = await UserModel.findById({ _id: id })
            .populate('position_ref_id')
            .populate('group_ref_id');
        } else if (req.query?.first_name && req.query?.contact) {
          const contact = req.query?.contact.replace(' ', '+');
          data = await UserModel.find({
            contact: contact,
            first_name: req.query.first_name,
          })
            .populate('position_ref_id')
            .populate('group_ref_id');
        } else if (req.query?.first_name && !req.query?.contact) {
          data = await UserModel.find({
            first_name: req.query.first_name,
          })
            .populate('position_ref_id')
            .populate('group_ref_id');
        } else if (!req.query?.first_name && req.query?.contact) {
          const contact = req.query?.contact.replace(' ', '+');
          data = await UserModel.find({
            contact: contact,
          })
            .populate('position_ref_id')
            .populate('group_ref_id');
        } else if (req.query?.gender) {
          data = await UserModel.find({
            gender: gender == 'male' ? true : false,
          })
            .populate('position_ref_id')
            .populate('group_ref_id');
        } else
          data = await UserModel.find()
            .populate('position_ref_id')
            .populate('group_ref_id');

        return res.send({
          status: 200,
          message: 'success',
          data: data,
        });
      }

      const token = req.headers?.authorization;

      const getToken = checkToken(token, res);

      if (typeof getToken == 'string') throw new Error(getToken);

      let data = await UserModel.findById({ _id: getToken?.id })
        .populate('position_ref_id')
        .populate('group_ref_id');

      if (!data) throw new Error('Not Found user!');

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
  async postUser(req, res) {
    try {
      const data = await UserModel.create(req.body);

      const token = jwt.sign(
        {
          id: data._id,
          contact: data.contact,
          email: data.email,
        },
        SEC_KEY,
        {
          expiresIn: '5 days',
        }
      );

      return res.send({
        status: 200,
        message: 'success',
        token: token,
      });
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
  async loginUser(req, res) {
    try {
      const { email, contact } = req.body;

      if (!email || !contact) throw new Error('Incorrect values!');

      if (email.length < 3 || email.length > 120)
        throw new Error('Incorrect user email!');

      if (contact.length < 9 || contact.length > 13)
        throw new Error('Incorrect user contact!');

      const data = await UserModel.findOne({
        email: email,
        contact: contact,
      });

      if (!data) throw new Error('Not Found User');

      const token = jwt.sign(
        {
          id: data._id,
          contact: data.contact,
          email: data.email,
        },
        SEC_KEY,
        {
          expiresIn: '5 days',
        }
      );

      return res.send({
        status: 200,
        message: 'success',
        token: token,
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
      const { id } = req.params;
      const token = req.headers?.authorization;
      const verifyToken = checkToken(token, res);

      if (typeof verifyAdmin != 'string') {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: id },
          req.body,
          {
            new: true,
          }
        );

        if (!updatedUser) throw new Error('Not Found user!');

        return res.send({
          status: 200,
          message: 'success',
          data: updatedUser,
        });
      }

      if (verifyToken?.id == id) {
        const updatedData = await UserModel.findOneAndUpdate(
          { _id: id },
          req.body,
          {
            new: true,
          }
        );

        return res.send({
          status: 200,
          message: 'success',
          updatedData,
        });
      } else throw new Error("You can't change other user data!");
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
      const { id } = req.params;
      const token = req.headers?.authorization;
      const verifyToken = checkToken(token, res);

      if (typeof verifyAdmin != 'string') {
        const deletedUser = await UserModel.findOneAndDelete(
          { _id: id },
          {
            new: true,
          }
        );

        if (!deletedUser) throw new Error('Not Found user!');

        return res.send({
          status: 200,
          message: 'success',
          data: deletedUser,
        });
      }

      if (verifyToken?.id == id) {
        const deletedData = await UserModel.findOneAndDelete(
          { _id: id },
          {
            new: true,
          }
        );

        if (!deletedData) throw new Error('Not Found user!');

        return res.send({
          status: 200,
          message: 'success',
          deletedData,
        });
      } else throw new Error("You can't delete other user data!");
    } catch (err) {
      return res.status(501).send({
        status: 501,
        message: err.message,
        data: null,
      });
    }
  }
}
