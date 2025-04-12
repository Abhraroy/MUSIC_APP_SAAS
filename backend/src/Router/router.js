"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoutes_1 = require("./userRoutes");
var authRouter_1 = require("./authRouter");
var express_2 = require("express");
console.log("✅ appRouter loaded");
var appRouter = (0, express_2.Router)();
appRouter.use(express_1.default.json());
appRouter.get("/", function (req, res) {
    res.send("🚀 Test route works");
});
//Route declaration for overall server
appRouter.use("/auth", authRouter_1.default);
appRouter.use("/user", userRoutes_1.default);
// appRouter.use("/Artist-admin",ArtistRoutes)
exports.default = appRouter;
