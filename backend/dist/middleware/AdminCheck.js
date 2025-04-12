export const isAdmin = (req, res, next) => {
    const key = req.body.key;
    console.log(process.env.ADMIN_KEY);
    if (key === process.env.ADMIN_KEY) {
        next();
    }
    else {
        res.status(400).json({ msg: "You are not ADMIN" });
    }
};
export const checkAdminAuth = (req, res, next) => {
    // Check if admin is authenticated (using session or token)
    // For example, with session:
    if (req.session && req.session.isAdminAuthenticated) {
        next(); // Admin is authenticated, proceed to next middleware/route handler
    }
    else {
        // Admin is not authenticated
        res.status(401).json({ error: "Admin authentication required" });
    }
};
