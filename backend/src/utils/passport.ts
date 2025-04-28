import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2"; // googleStrategy as it is google oauth
import { userModel } from "../Models/DB_MODEL.js";

passport.serializeUser((user: any, done) => done(null, user._id)); //serializing users

passport.deserializeUser(async (id: any, done) => {
  // deserializing user to get the data out of it
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return done(new Error("User not found"), null);
    }
    done(null, user); // makes `req.user` available in routes
  } catch (err) {
    done(err, null);
  }
});












export const configurePassport = async () => {
  console.log("✅ CALLBACK URL:", process.env.OAUTH_CALLBACK_URL);

  // setting the strategy configuration for passport

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.OAUTH_CLIENT_ID || "",
        clientSecret: process.env.OAUTH_CLIENT_SECRET || "",
        callbackURL: process.env.OAUTH_CALLBACK_URL || "",
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        try {
          let user = await userModel.findOne({
            email: profile.emails[0].value,
          }); // searching databse to find if the user already exists in the database
          if (!user) {
             user = await userModel.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
            });
          } else if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

 
};
