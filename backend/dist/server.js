import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import appRouter from "./Router/router.js";
import { configurePassport } from "./utils/passport.js";
import cloudinaryConfig from "./utils/cloudinaryconfig.js";
dotenv.config();
console.log("ENV PORT:", process.env.PORT);
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day   
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());
configurePassport();
cloudinaryConfig();
app.get("/", (req, res) => {
    res.send("<h2>hey hello</h2>");
});
//generalizatiion of api routes
app.use("/api/v1", appRouter);
export default app;
