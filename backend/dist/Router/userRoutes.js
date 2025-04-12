import { Router } from "express";
const userRoutes = Router();
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
