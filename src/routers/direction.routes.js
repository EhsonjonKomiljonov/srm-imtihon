import { Router } from 'express';
import { DirectionContr } from '../controllers/direction.contr.js';

const direction = new DirectionContr();

export const directionRouter = Router();

directionRouter
  .post('/', direction.post)
  .put('/:id', direction.put)
  .delete('/:id', direction.delete);
