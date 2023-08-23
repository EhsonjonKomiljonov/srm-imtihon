import { Router } from 'express';
import { PositionContr } from '../controllers/position.contr.js';

const position = new PositionContr();

export const positionRouter = Router();

positionRouter
  .post('/', position.post)
  .put('/:id', position.put)
  .delete('/:id', position.delete);
