const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
 
const validateToken = asyncHandler(async(req, res, next) => {
    console.log("here it is");
    let token;
    let authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader && authHeader.startsWith("Bearer")){
    // if (authHeader){
        console.log(authHeader, " hh");
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
        if (!token){
            res.status(401);
            throw new Error("User is not authorized");
        }
    }
});

module.exports = validateToken;