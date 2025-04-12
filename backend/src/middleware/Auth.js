"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedUser = void 0;
var isAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated) {
        next();
    }
    else {
        return res.status(401).json({ msg: "The user is not Authorized" });
    }
};
exports.isAuthenticatedUser = isAuthenticatedUser;
