const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

//verify the token passed
const verifyToken = (req,res,next) => {
    const token = req.headers["x-access-token"];

    //Check if the token passed
    if(!token){
        return res.status(403).send({
            message : "Failed! access-token is not provided"
        })
    };

    //Now go and verify the token
    jwt.verify(token,"Random_key" , (err,decoded) =>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized!"
            })
        }

        req.userId = decoded.id;
        next();
    })
}

//Check if the request params is valid
const isValidUserIdInRequestParams = async (req,res,next) => {
    try{
        const user = User.find({userId : req.params.id});

        if(!user){
            return res.status(400).send({
                message : "userId passed doesn't exist"
            })
        }
        next();
    }catch(err){
        console.log("Internal while reading user info", err.message);
        return res.status(500).send({
            message : "Error while resding the user Info"
        })
    };
}

const authJwt = {
    verifyToken : verifyToken,
    isValidUserIdInRequestParams : isValidUserIdInRequestParams
};

module.exports = authJwt;