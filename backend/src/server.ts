import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import passport from "passport"
import session from "express-session"


// Importing main route handler

import appRouter from "./Router/router.js"; 


// Configuration functions

import { configurePassport } from "./utils/passport.js"
import cloudinaryConfig from "./utils/cloudinaryconfig.js"


// configuring dotenv

dotenv.config()
console.log("ENV PORT:", process.env.PORT);




// Initializing the app and necessary middlewares

const app = express()
app.use(express.json())
app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true}))
app.use(cookieParser(process.env.COOKIE_SECRET))



// Necessary configuration for session for passport

app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:true,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24, // 1 day   
            httpOnly:true,
            secure:process.env.NODE_ENV==="production"?true:false,
            }
        })
)


//Initializing passport and making it with session

app.use(passport.initialize())
app.use(passport.session())



// Calling the utility function to configure passport 

configurePassport()


// Calling the utility function to configure Cloudinary API 

cloudinaryConfig()




// Home route not necessary can be deleted

app.get("/",(req,res)=>{
    res.send("<h2>hey hello</h2>")
})

//generalizatiion of api routes

app.use("/api/v1",appRouter)





export default app