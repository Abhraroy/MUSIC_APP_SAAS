//Middleware for checking if admin or not

import { Request,Response,NextFunction } from "express";

// Extend the Request interface to include isAdmin
declare global {
    namespace Express {
        interface Request {
            isAdmin?: boolean;
        }
    }
}
import jwt from "jsonwebtoken"


export const isAdmin = (req:Request,res:Response,next:NextFunction)=>{
    const isToken = req.headers.isAdmin
    console.log(isToken)
    try{let token
    if(isToken){
        token = isToken
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && typeof decoded !== "string") {
        req.isAdmin = (decoded as jwt.JwtPayload).isAdmin;
    }
    next()}catch(err){
        res.status(403).json({
            msg:"Not authorized"
        })
    }
}
