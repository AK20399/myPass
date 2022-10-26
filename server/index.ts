import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {connectDB} from './utils/database'
import {router} from './routes'

dotenv.config();

const app: Express = express();
app.use(cors({origin:'http://localhost:3000',methods: "GET,HEAD,PUT,PATCH,POST,DELETE",credentials:true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname,'build')))

app.use('/api',router)

if(process.env.PORT){
  connectDB().then(()=>{
    app.listen(process.env.PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
    });
  }).catch(error=>{
    console.log(error)
  })
}