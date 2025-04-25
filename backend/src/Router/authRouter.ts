// Main route handler for authentication related routes




import {Router,Response,Request,NextFunction} from "express" // Importing types 
import passport from "passport"


const authRouter = Router()

const googleAuthMiddleware = passport.authenticate("google", { scope: ["email", "profile"] }); // Specifying the strategy and scope for passport for authetication



console.log("✅ Google Auth Route Registered");



authRouter.get("/google", googleAuthMiddleware); // route for login via google



// route for testing during development can be deleted

authRouter.get("/test", (req, res) => {
    res.send("🚀auth Test route works");
  });




// routes for the next steps after successfull or login failure


///google/callback is the route where it will be redirected on successfull login it has to be same as the one in google api platform

authRouter.get("/google/callback",passport.authenticate("google",{
    failureRedirect:"api/v1/auth/login-failed", // route to redirect to if login failed
}),(req:Request,res:Response,next:NextFunction)=>{
    try {
    res.status(200).redirect(`${process.env.CLIENT_URI}?`); // Redirect to your client URL with user info
    } catch (err) {
        console.error('Google OAuth Error:', err); // logs detailed error
        next(err);
    }

}
)


//failed login route

authRouter.get("/login-failed",(req:Request,res:Response)=>{
    res.status(401).json({
        success:false,
        msg:"Authentication failed"
    })
})




//logout route

authRouter.get("/logout",(req:Request,res:Response)=>{
    req.logOut((err)=>{
        if(err){
            res.status(500).json({
                success:false,
                msg:"Error logging out"
            })
        }
            req.session.destroy((err)=>{
                if(err){
                    res.status(500).json({
                        success:false,
                        msg:"Error logging out"
                    })
                }
                res.clearCookie("connect.sid") // clearing the cookie the cookie name is coonect.sid
                res.clearCookie("auth_token") // clearing the cookie auth token
                res.status(200).json({
                success:true,
                msg:"The use successfully logout"
            })
            })
    })
})






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



export default authRouter