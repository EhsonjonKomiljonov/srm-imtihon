import express from 'express';
import './db/mongo.js';
import { departmentRouter } from './src/routers/department.routes.js';
import { directionRouter } from './src/routers/direction.routes.js';
import { groupRouter } from './src/routers/group.routes.js';
import { positionRouter } from './src/routers/position.routes.js';
import { userRouter } from './src/routers/user.routes.js';
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/department', departmentRouter);
app.use('/groups', groupRouter);
app.use('/positions', positionRouter);
app.use('/directions', directionRouter);
