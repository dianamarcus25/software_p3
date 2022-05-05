const jsonwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const ErrorResponses = require("../utils/errorResponses")

exports.protect = async(req, res, next) => {
let token;

if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
    }
    if(!token) {
        return next(new ErrorResponses("Not authorised to access this route", 401));
    }

    try {
        const decoded =jsonwt.verify(token, process.env.JWTSECRET)
        const user = await User.findById(decoded.id)
        if(!user){
            return next(new ErrorResponses("No user with this id", 404))
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorResponses("Not authorised to access this route", 401));
    }
}