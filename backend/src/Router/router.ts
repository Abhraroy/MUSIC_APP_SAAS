// The main route handler


import express from "express"
import { Router } from "express"

//Importing Route for overall server

import userRoutes from "./userRoutes.js"
// import authRouter from "./authRouter.js"
import ArtistRoutes from "./ArtistRoutes.js";
import mediaRoute from "./mediaRoutes.js";

// Middleware for checking user authentication

// import { isAuthenticatedUser } from "../middleware/Auth.js";





console.log("✅ appRouter loaded");



// Initializing

const appRouter = Router()



// Middleware to use req.body

appRouter.use(express.json())


// For testing during development can be deleted

appRouter.get("/", (req, res) => {
    res.send("🚀 Test route works");
  });




//Route declaration for overall server


// appRouter.use("/auth",authRouter) // route handler for handling all routes related to authentication

appRouter.use("/user",userRoutes) // route handler for handling all routes related to user

appRouter.use("/media",mediaRoute) //// route handler for handling all routes related to Mediafiles

appRouter.use("/Artist-admin",ArtistRoutes) // route handler for handling all routes related to Admin here aka artist



export default appRouter