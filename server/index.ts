import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import {router} from './routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {connectDB} from './utils/database'

dotenv.config();

const port = process.env.PORT;
const app: Express = express();
app.use(cors({origin:'http://localhost:3000',methods: "GET,HEAD,PUT,PATCH,POST,DELETE",credentials:true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname,'build')))

app.use('/api',router)

connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}).catch(error=>{
  console.log(error)
})