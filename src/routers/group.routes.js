import { Router } from 'express';
import { GroupContr } from '../controllers/group.contr.js';

const group = new GroupContr();

export const groupRouter = Router();

groupRouter
  .get('/', group.get)
  .get('/:id', group.get)
  .post('/', group.post)
  .put('/:id', group.put)
  .delete('/:id', group.delete);
