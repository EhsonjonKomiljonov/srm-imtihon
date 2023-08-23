import { Router } from 'express';
import { DepartmentContr } from '../controllers/department.contr.js';

const department = new DepartmentContr();

export const departmentRouter = Router();

departmentRouter
  .get('/', department.get)
  .get('/:direct/:group_id', department.getDirection)
  .get('/:id', department.get)
  .post('/', department.post)
  .put('/:id', department.put)
  .delete('/:id', department.delete);
