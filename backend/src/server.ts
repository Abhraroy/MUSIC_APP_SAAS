import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import cookieSession from "cookie-session"


import appRouter from "./Router/router.js"; 
// import { passportStrategy } from "./utils/passport.js"


import cloudinaryConfig from "./utils/cloudinaryconfig.js"


dotenv.config()
console.log("ENV PORT:", process.env.PORT);




const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true
    ,
    exposedHeaders: ['set-cookie']
}))
app.use(cookieParser(process.env.COOKIE_SECRET))




cloudinaryConfig()








app.get("/",(req,res)=>{
    res.send("<h2>hey hello</h2>")
})


app.use("/api/v1",appRouter)





export default app