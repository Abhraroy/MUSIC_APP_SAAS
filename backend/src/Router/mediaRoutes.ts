import {Router} from "express"

//importing database models for media

import { mediaModel } from "../Models/DB_MODEL.js"


const mediaRoute = Router()



// route for getting all the media

mediaRoute.get("/",async(req,res)=>{
    try {
        const mediaResult = await mediaModel.find()
        res.status(200).json({mediaResult})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error})       
    }
    
})


// route for playing a perticuler song

mediaRoute.get("/getMusic/:id",async(req,res)=>{
    try {
        const id = req.params.id.toString()
        const mediaResult = await mediaModel.findById(id)
        if(!mediaResult){
            res.status(404).json({msg:"No media found"})
        }

        res.status(200).json({mediaResult})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})       
    }
    
})






export default mediaRoute