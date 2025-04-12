import {Request,Response,NextFunction} from "express"

export const isAuthenticatedUser = (req:Request,res:Response,next:NextFunction) =>{
    if(!req.isAuthenticated()){
        res.status(401).json({msg:"The user is not Authorized"})
    }else{
        next()
    }
   
}