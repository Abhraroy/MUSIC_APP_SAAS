export const isAuthenticatedUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ msg: "The user is not Authorized" });
    }
    else {
        next();
    }
};
