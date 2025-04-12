"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoutes = (0, express_1.Router)();
userRoutes.get("/test", function (req, res) {
    res.send("🚀 Test route works");
});
exports.default = userRoutes;
