const protect = async (req, res, next) => {
    console.log("Cookies received:", req.cookies); // Debugging line
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default protect;
