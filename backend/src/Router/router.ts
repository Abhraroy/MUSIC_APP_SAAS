import express from "express"
import userRoutes from "./userRoutes.js"
import authRouter from "./authRouter.js"
import { Router } from "express"
import ArtistRoutes from "./ArtistRoutes.js";
import { isAuthenticatedUser } from "../middleware/Auth.js";
import mediaRoute from "./mediaRoutes.js";



console.log("✅ appRouter loaded");




const appRouter = Router()





appRouter.use(express.json())
appRouter.get("/", (req, res) => {
    res.send("🚀 Test route works");
  });

//Route declaration for overall server
appRouter.use("/auth",authRouter)
appRouter.use("/user",isAuthenticatedUser,userRoutes)
appRouter.use("/media",isAuthenticatedUser,mediaRoute)
appRouter.use("/Artist-admin",ArtistRoutes)



export default appRouter