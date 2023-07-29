/**
 * Module that verifies json web token
 * 
 */

const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    //check if the authHeader begins with 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    //   [0]      [1]
    // 'Bearer <token>'
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

module.exports = verifyJWT