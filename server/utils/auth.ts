import { Request, Response,NextFunction } from "express"
import jwt, { verify } from 'jsonwebtoken'
import userSchema from "../models/userSchema"
import { UserDataType } from "../types"
import { TOKEN_COOKIE } from "./constants"

export const protectRoute = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        if(!req.cookies[TOKEN_COOKIE]){
            throw Error('User is not authorized')
        }
        if(!process.env.JWT_SECRET) throw Error('JWT secret is missing')
        
        const isVerified = verify(req.cookies[TOKEN_COOKIE],process.env.JWT_SECRET)
        if(!isVerified) throw Error("Token is invalid")

        const userData = jwt.decode(req.cookies[TOKEN_COOKIE])
        if(userData){
            const user = await userSchema.findById((userData as UserDataType)._id)
            if(!user) throw Error('Couldnt find user in database')
            req.user = user.toObject()
        }
        next()
    } catch (error:unknown) {
        res.status(401).json({message:error instanceof Error? error.message:'Something went wrong'})
    }
}

export const generateJWTToken = (payload:any)=>{
    if(process.env.JWT_SECRET){
        return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2 days'})
    }
    throw Error('Cant find jwt secret')
}