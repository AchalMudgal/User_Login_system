const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//LOGIC FOR SIGNUP
exports.signUp = async (req,res) => {
    
    const userObject = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)
    };

    try{
        const reqUser = await User.create(userObject);

        const response = {
            name : reqUser.name,
            userId : reqUser.userId,
            email : reqUser.email
        };

        res.status(201).send(response);
    }catch(err){
        console.log("Internal error while signUp");
        res.status(500).send({
            message : "Error while singUp of user"
        });
    }
};

//LOGIC FOR SIGNIN

exports.signIn = async (req, res) => {
    try{
        const user = await User.findOne({userId : req.body.userId});

        //Check if userId passed is valid
        if(user == null){
            return res.status(400).send({
                message : "Failed! userId passed is not correct"
            })
        }

        //Check if password passed is valid
        const passwordValidity = bcrypt.compareSync(req.body.password, user.password);

        //Cheack if password correct is correct
        if(!passwordValidity){
            return res.status(401).send({
                message : "Wrong password"
            });
        }

        //Create jsonwebtoken
        const token = jwt.sign({
            id:user.id
        },"Random_key",{
            expiresIn:6000
        });
        
        //Sucessful login response
        res.status(200).send({
            name : user.name,
            userId : user.userId,
            email : user.email,
            accessToken : token
        });
    }catch(err){
        console.log("Internal error while signIn", err.message);
        res.status(500).send({
            message : "Error while signin"
        });
    }
};

