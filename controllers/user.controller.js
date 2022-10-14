//This file deals with the data resource

const User = require('../models/user.model');
const objectConverter = require('../utils/objectConverter');
const Detail = require("../models/details.model");

// //This method will return the user details based on id
exports.findUsers = async (req,res) => {
    try{
        const user = await User.find({userId : req.body.userId});
        const userData = objectConverter.userResponse(user);
        res.status(200).json({status : 1, userData});
    }catch(err){
        console.log("Error while fetching the user");
        res.status(500).json({status : 0,
            message : "Internal Error found while fetching user by id"
        })
    }
};

//Update the user
exports.update = async (req,res) => {
    try{
        const user = await User.findOne({userId : req.body.userId});

        user.name = req.body.name != undefined ? req.body.name : user.name;
    
        const updatedUser = await user.save();

        const response = {
            name : updatedUser.name,
            email : updatedUser.email,
            userId : updatedUser.userId
        }
        res.sendStatus(200).json({status : 1, response});
    }catch(err){
        console.log("Internal error while updating", err.message);
        return res.status(500).json({status : 0,
            message : "Error while updating user info"
        })
    }
};



//Get users by limit
exports.getUsersByLimit = async (req,res) => {
    try{
        const users = await User.find().limit(parseInt(req.query.limit));
        const listedUsers = {users};

        res.status(200).json({status : 1 ,listedUsers});
    }catch(err){
        console.log("Internal Error while fetching all users data", err.message);
        return res.status(500).json({status : 0,
            message : "Error while fetching all users data"
        })
    };   
}
