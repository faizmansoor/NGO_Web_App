const jwt = require('jsonwebtoken');

const SECRET = 'SECRETSECRET';

const verifyToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    if(!token) {
        req.user = {role: 'User'};
        return next();
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
        //GOTTA HANDLE HOW TO COMMUNICATE TO BACKEND HERE. 
    } catch {
        res.status(401).json({ message: 'Invalid token' });

    }
};

//  FOR IF USERS HAVE LOGIN. DONT USE. DELETE IF YO UWANT
// gotta change the return type based on the function we use it for. 
// const checkRole = () => (req, res, next) => {
//     verifyToken(req, res, () => {
//       if (req.user.role !== 'NGO') {
//         return res.status(403).json({ message: 'Forbidden' });
//       }
//       next();
//     });
// }; 

module.exports = { verifyToken };