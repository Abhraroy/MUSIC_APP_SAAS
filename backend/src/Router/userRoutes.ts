import express from "express"
import { Router } from "express"
import { Request,Response } from "express"
import { isAuthenticatedUser } from "../middleware/Auth.js"

const userRoutes = Router()

userRoutes.get("/currentuser",(req:Request,res:Response)=>{
    if(req.isAuthenticated()){
        res.status(200).json({
            success:true,
            msg:req.user
        })
    }else{
        res.status(401).json({
            success:false,
            msg:"The user is not authenticated"
        })
    }
})


export default userRoutes