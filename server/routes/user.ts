import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import userSchema from '../models/userSchema'

const router= express.Router()

router.post('/login',async (req,res)=>{
    try {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.CLIENT_ID
        });
        const data = ticket.getPayload();
        const userData= await userSchema.findOne({email:data?.email})
        if(!userData){
            const user= await userSchema.create({username:data?.name,email:data?.email,profilePicture:data?.picture,googleToken:req.body.token})
            res.status(201).json(user)
        }else{
            res.status(200).json(userData)
        }
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/dashboard',(req,res)=>{
    res.json({cookie:req.cookies})
})

router.get('/logout',(req,res)=>{
    res.clearCookie('AuthToken')
    res.send('logout successful')
})

export {router as user}
