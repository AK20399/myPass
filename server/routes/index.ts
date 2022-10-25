import express from 'express'
import {OAuth2Client} from 'google-auth-library'
import userSchema from '../models/userSchema'

const client = new OAuth2Client(process.env.CLIENT_ID)

const router = express.Router()

router.post('/login',async (req,res)=>{
  const { googleToken,googleId }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.CLIENT_ID
    });
    const data = ticket.getPayload();
    const userData= await userSchema.findOne({email:data?.email})
    if(!userData){
       const user= await userSchema.create({username:data?.name,email:data?.email,profilePicture:data?.picture,googleId,googleToken})
       res.status(201).json(user)
    }
})

router.get('/dashboard',(req,res)=>{
    res.json({cookie:req.cookies})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('AuthToken')
    res.send('logout successful')
})


export { router }