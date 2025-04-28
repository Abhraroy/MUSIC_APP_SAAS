// Main route handler for authentication related routes

import { userModel } from "../Models/DB_MODEL.js";
import { Router, Response, Request, NextFunction } from "express"; // Importing types
// Removed incorrect import for GetTokenResponse

declare module "express-session" {
  interface Session {
    user?: any; // Add the user property to the Session interface
  }
}
import { OAuth2Client } from "google-auth-library";

const authRouter = Router();

// const googleAuthMiddleware = passport.authenticate("google", { scope: ["email", "profile"] }); // Specifying the strategy and scope for passport for authetication
// Set up Google OAuth2 client
const client = new OAuth2Client(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_CALLBACK_URL
);

console.log("✅ Google Auth Route Registered");

authRouter.get("/auth/google", (req, res) => {
//   const url = client.generateAuthUrl({
//     access_type: "offline",
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.profile",
//       "https://www.googleapis.com/auth/userinfo.email",
//     ],
//   });
  res.send("hey")
}); // route for login via google

// route for testing during development can be deleted

authRouter.get("/test", (req, res) => {
  res.send("🚀auth Test route works");
});

// routes for the next steps after successfull or login failure

///google/callback is the route where it will be redirected on successfull login it has to be same as the one in google api platform

authRouter.get(
  "/google/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.query;
    try {
      // Exchange the code for tokens
      const response = await client.getToken(code as string); // Explicitly cast 'code' as string
      const tokens = response.tokens;

      client.setCredentials(tokens);

      // Use the token to get user info
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.OAUTH_CLIENT_ID,
      });
      const profile = ticket.getPayload();

      let user = await userModel.findOne({
        email: profile.email,
      }); // searching databse to find if the user already exists in the database
      if (!user) {
        user = await userModel.create({
            googleId: profile.sub, // Use 'sub' as the Google ID
            name: profile.name,
            email: profile.email,
            avatar: profile.picture, // Use 'picture' for the avatar URL
        });
      } else if (!user.googleId) {
        user.googleId = profile.sub;
        await user.save();
      }
      // This contains the user's information (name, email, picture, etc.)

      // Save the user info in the session
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };

      res.status(200).redirect(`${process.env.CLIENT_URI}`); // Redirect to your client URL with user info
    } catch (err) {
      console.error("Google OAuth Error:", err); // logs detailed error
      next(err);
    }
  }
);

//failed login route

authRouter.get("/login-failed", (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    msg: "Authentication failed",
  });
});

//logout route

authRouter.get("/logout", (req: Request, res: Response) => {
  req.logOut((err) => {
    if (err) {
      res.status(500).json({
        success: false,
        msg: "Error logging out",
      });
    }
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({
          success: false,
          msg: "Error logging out",
        });
      }
      res.clearCookie("connect.sid"); // clearing the cookie the cookie name is coonect.sid
      res.clearCookie("auth_token"); // clearing the cookie auth token
      res.status(200).json({
        success: true,
        msg: "The use successfully logout",
      });
    });
  });
});

authRouter.get("/currentuser", (req: Request, res: Response) => {
  console.log("Cookies:", req.cookies);
  if (req.session.user) {
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

authRouter.get("/session-test", (req: Request, res: Response) => {
  try {
    console.log("Session test:", req.session);
    console.log("User:", req.user);
    res.json({
      sessionExists: !!req.session,
      isAuthenticated: req.isAuthenticated(),
      sessionId: req.sessionID,
      user: req.user || null,
    });
  } catch (Err) {
    console.log(Err);
  }
});

export default authRouter;
