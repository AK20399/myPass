import express from 'express'
import { OAuth2Client } from 'google-auth-library'
import userSchema from '../models/userSchema'
import { generateJWTToken, protectRoute } from '../utils/auth'
import { TOKEN_COOKIE } from '../utils/constants'

const router= express.Router()

router.post('/login',async (req,res)=>{
    try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const data = ticket.getPayload();
        const userData= await userSchema.findOne({email:data?.email})
        if(!userData){
            const user= await userSchema.create({username:data?.name,email:data?.email,profilePicture:data?.picture,googleToken:req.body.token})
            res.cookie(TOKEN_COOKIE,generateJWTToken(user.toObject()),{httpOnly:true})
            res.status(201).json(user.toObject())
        }else{
            res.cookie(TOKEN_COOKIE,generateJWTToken(userData.toObject()),{httpOnly:true})
            res.status(200).json(userData.toObject())
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }
})

router.get('/dashboard',protectRoute,(req,res)=>{
    res.json({user:req.user})
})

router.get('/logout',(req,res)=>{
    res.clearCookie(TOKEN_COOKIE)
    res.send('logout successful')
})

export {router as user}
