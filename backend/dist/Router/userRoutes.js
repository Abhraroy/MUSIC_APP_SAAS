// Route in charge of handling all the actions related to user
import { Router } from "express";
// Initializing
const userRoutes = Router();
// Route for getting the data of the user that is currently logged in
userRoutes.get("/currentuser", (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            success: true,
            msg: req.user
        });
    }
    else {
        res.status(401).json({
            success: false,
            msg: "The user is not authenticated"
        });
    }
});
export default userRoutes;
