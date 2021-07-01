const config = require('config')
const JWt = require('jsonwebtoken')
    //const { JWT_SECRET } = require('../config/keys')

module.exports = function(req, res, next) {
    const tokenHeader = req.header('x-Moetez-Auth-token');
    if (!tokenHeader) return res.status(401).send(" Sorry you have not access "); // 
    try {
        const decoded = JWt.verify(tokenHeader, 'JwtPrivateKey')
        req.user = decoded; // send decode token kif n7ib nchouf exemple email de token on fait req.user.email
        next();
    } catch (ex) {
        res.status(400).send('invalid token ')
    }
}