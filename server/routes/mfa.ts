import express from 'express'
import qrcode from 'qrcode'
import speakeasy from 'speakeasy'
import userSchema from '../models/userSchema'
import { protectRoute } from '../utils/auth'

const router= express.Router()

router.use(protectRoute)

router.get('/qrcode', async(req,res)=>{
    try {    
        const secret = speakeasy.generateSecret({issuer:req.user.email,name:`myPass (${req.user.email})`,otpauth_url:true,symbols:true})
        await userSchema.findByIdAndUpdate(req.user._id,{$set:{mfaSecret:secret.base32}})

        qrcode.toDataURL(secret.otpauth_url,(err,url)=>{
            res.send(url)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error})
    }
})

router.post('/verify',(req,res)=>{
    const isValid= speakeasy.totp.verify({ secret: req.user.mfaSecret, encoding: 'base32', token: req.body.code });
    if (isValid) {
        res.send(true)
    } else {
        res.send(false)
    }
})

export {router as mfa}
