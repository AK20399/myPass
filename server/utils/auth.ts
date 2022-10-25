import { Request, Response,NextFunction } from "express"

export const authenticate = (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        if(!req.cookies.AuthToken){
            throw Error('User is not authorized')
        }
        // JWT verification
        next()
    } catch (error:unknown) {
        res.status(401).json({message:error instanceof Error? error.message:'Something went wrong'})
    }
}