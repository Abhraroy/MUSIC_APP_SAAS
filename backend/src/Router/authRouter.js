"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = require("passport");
var authRouter = (0, express_1.Router)();
var googleAuthMiddleware = passport_1.default.authenticate("google", { scope: ["email", "profile"] });
console.log("✅ Google Auth Route Registered");
authRouter.get("/google", googleAuthMiddleware);
authRouter.get("/test", function (req, res) {
    res.send("🚀 Test route works");
});
authRouter.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "api/v1/auth/login-failed",
}), function (req, res) {
    res.status(200).json({ msg: "user ok going to frontend" });
});
authRouter.get("/login-failed", function (req, res) {
    res.status(401).json({
        success: false,
        msg: "Authentication failed"
    });
});
authRouter.get("/logout", function (req, res) {
    req.logOut(function (err) {
        if (err) {
            res.status(500).json({
                success: false,
                msg: "Error logging out"
            });
        }
        else {
            res.status(200).json({
                success: true,
                msg: "The use successfully logout"
            });
        }
    });
});
authRouter.get("/currentuser", function (req, res) {
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
exports.default = authRouter;
