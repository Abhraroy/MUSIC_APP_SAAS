
// Route in charge of handling all the actions related to user




import express from "express"
import { Router } from "express"
import { Request,Response } from "express"
import { isAuthenticatedUser } from "../middleware/Auth.js"



// Initializing

const userRoutes = Router()

export default userRoutes