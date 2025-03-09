import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken; // Ensure you're using the correct cookie name
    
    if (!token) {
        req.user = { role: 'User' }; // Set default user role if no token
        return next();
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // Attach the decoded token to req.user
        console.log('Decoded token:', decoded);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export { verifyToken };
