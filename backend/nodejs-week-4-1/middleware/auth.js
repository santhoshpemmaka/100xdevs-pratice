const jwt = require('jsonwebtoken');
const JWTSECRET = "secret";
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    try {
        if (!token) {
            return res.status(403).json({
                message: "Provide token for authorised"
            })
        }
        const decode = jwt.verify(token, JWTSECRET);
        if (decode && decode?.email && decode.password) {
            req.userEmail = decode.email;
            next();
        }
    }
    catch (Err) {
        console.log("Error occured in middleware function",Err);
        return res.status(500).json({
            message : "Error occured in the server"
        })
    }

}

module.exports = authMiddleware;