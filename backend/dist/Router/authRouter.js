import { Router } from "express";
import passport from "passport";
const authRouter = Router();
const googleAuthMiddleware = passport.authenticate("google", { scope: ["email", "profile"] });
console.log("✅ Google Auth Route Registered");
authRouter.get("/google", googleAuthMiddleware);
authRouter.get("/test", (req, res) => {
    res.send("🚀auth Test route works");
});
authRouter.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "api/v1/auth/login-failed",
}), (req, res, next) => {
    try {
        res.status(200).redirect(`${process.env.CLIENT_URL}?user=${req.user}`); // Redirect to your client URL with user info
    }
    catch (err) {
        console.error('Google OAuth Error:', err); // logs detailed error
        next(err);
    }
});
authRouter.get("/login-failed", (req, res) => {
    res.status(401).json({
        success: false,
        msg: "Authentication failed"
    });
});
authRouter.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            res.status(500).json({
                success: false,
                msg: "Error logging out"
            });
        }
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: "Error logging out"
                });
            }
            res.clearCookie("connect.sid");
            res.clearCookie("auth_token");
            res.status(200).json({
                success: true,
                msg: "The use successfully logout"
            });
        });
    });
});
// authRouter.get("/currentuser",(req:Request,res:Response)=>{
//     if(req.isAuthenticated()){
//         res.status(200).json({
//             success:true,
//             msg:req.user
//         })
//     }else{
//         res.status(401).json({
//             success:false,
//             msg:"The user is not authenticated"
//         })
//     }
// })
export default authRouter;
