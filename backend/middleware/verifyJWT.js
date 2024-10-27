const jwt = require('jsonwebtoken')

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) return res.sendStatus(403); // invalid token
            req.user = decoded.UserInfo.email;
            req.roles = decoded.UserInfo.roles
            next();
        }
    );
}

module.exports = verifyJWT