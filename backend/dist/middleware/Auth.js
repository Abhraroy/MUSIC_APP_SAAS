export const isAuthenticatedUser = (req, res, next) => {
    if (!req.isAuthenticated()) { //this isAuthenticated belongs to request
        res.status(401).json({ msg: "The user is not Authorized" });
    }
    else {
        next();
    }
};
