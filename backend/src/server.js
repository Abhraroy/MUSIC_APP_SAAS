"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var passport_1 = require("passport");
var express_session_1 = require("express-session");
var passport_2 = require("./utils/passport");
dotenv_1.default.config();
console.log("ENV PORT:", process.env.PORT);
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day   
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_2.configurePassport)();
app.get("/home", function (req, res) {
    res.send("<h2>hey hello</h2>");
});
//generalizatiion of api routes
app.get("/api", function (req, res) {
    res.send("<h1>this works</h1>");
});
exports.default = app;
