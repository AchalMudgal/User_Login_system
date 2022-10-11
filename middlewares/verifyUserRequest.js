//Logic to verify the req body passed

const User = require("../models/user.model");

//validate signUp req body

const signUpReqValidation = async (req,res,next) => {
    //Validate if name is provided
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed! name of the user is not provided while signup"
        })
    };

    //Validate if userId is provided
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! userId is not provided while signup"
        })
    };

    //Check if userId passed is not duplicate
    try{
        const user = await User.findOne({userId : req.body.userId});
        if(user != null){
            return res.status(400).send({
                message : "Failed! userId passed is already taken"
            })
        };
    }catch(err){
        return res.status(500).send({
            message : "Internal error while validating userId"
        })
    };

    //Validate if password is present
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! Password is not provided"
        })
    };

    //Validate if email is provided
    if(!req.body.email){
        return res.status(400).send({
            message : "Failed! email is not provided"
        })
    };

    next();
}


//Validate signIn request

const signInReqBodyValidation = async (req,res,next) => {
    //Validate if userId is present
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! userId is not provided"
        });
    };

    //Validate if password is present
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! password is not provided"
        })
    };

    next();
}


const verifyAuthReqBody = {
    signUpReqValidation : signUpReqValidation,
    signInReqBodyValidation : signInReqBodyValidation
};

module.exports = verifyAuthReqBody;