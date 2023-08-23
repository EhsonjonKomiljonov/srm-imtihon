import { Router } from 'express';
import { UserContr } from '../controllers/user.contr.js';
import { checkUser } from '../middlewares/user.check.js';

const user = new UserContr();

export const userRouter = Router();

userRouter
  .post('/', checkUser, user.postUser)
  .post('/login', user.loginUser)
  .get('/', user.getUser)
  .put('/:id', user.put)
  .delete('/:id', user.delete)
  // POST ADMINNI SIZ UCHUN QO'SHIB QOYDIM 😉
  .post('/admin', checkUser, user.postAdmin)
  .post('/admin/login', user.loginAdmin);
