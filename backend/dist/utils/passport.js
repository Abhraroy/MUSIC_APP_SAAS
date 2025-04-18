import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { userModel } from "../Models/DB_MODEL.js";
export const configurePassport = async () => {
    console.log("✅ CALLBACK URL:", process.env.OAUTH_CALLBACK_URL);
    passport.use(new GoogleStrategy({
        clientID: process.env.OAUTH_CLIENT_ID || "",
        clientSecret: process.env.OAUTH_CLIENT_SECRET || "",
        callbackURL: process.env.OAUTH_CALLBACK_URL || ""
    }, (accessToken, refreshToken, profile, done) => {
        (async () => {
            try {
                const user = await userModel.findOne({ email: profile.emails[0].value });
                if (!user) {
                    const user = await userModel.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value
                    });
                }
                else if (!user.googleId) {
                    user.googleId = profile.id;
                    await user.save();
                }
                return done(null, user);
            }
            catch (error) {
                return done(error, null);
            }
        })();
    }));
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user); // makes `req.user` available in routes
        }
        catch (err) {
            done(err, null);
        }
    });
};
