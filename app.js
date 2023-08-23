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

// import { CenterModel } from './src/models/center.model.js';
// import { DepartmentModel } from './src/models/department.model.js';
// import { DirectionModel } from './src/models/direction.model.js';
// import { GroupModel } from './src/models/group.model.js';
// import { PositionModel } from './src/models/position.model.js';

// CenterModel.create({
//   name: "Najot Ta'lim",
//   address: 'Toshkent',
// });
// DepartmentModel.create({
// center_ref_id: "64e46a5a3765c9a244985f9b",
// position_ref_id: "64e4d34293dcddbca098518c",
// dep_name: "Moliya",
// });
// DirectionModel.create({
//   dir_name: "O'quv bo'limi",
//   duration: 7,
//   salary: 1100000
// });
// GroupModel.create({
//   gr_number: 5,
//   direction_ref_id: '64e4b9f0d6c1f9c099ce4666',
// });
// PositionModel.create({
//   pos_name: "Bug'alter",
// });
// UserModel.create({
//   first_name: "Admin",
//   last_name: "Admin",
//   gender: true,
//   contact: "+998977776677",
//   email: "admin@gmail.com"
// });
