import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {router} from './routes'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname,'build')))

app.use('/api',router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});