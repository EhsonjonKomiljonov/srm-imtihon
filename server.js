import { app } from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 9090;

app.listen(PORT, console.log('Server is run in port ' + PORT));
