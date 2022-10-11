//This file deals with the data resource

const User = require('../models/user.model');
const objectConverter = require('../utils/objectConverter');

// //This method will return the user details based on id
exports.findUsers = async (req,res) => {
    try{
        const user = await User.find({userId : req.params.id});

        res.status(200).send(objectConverter.userResponse(user));
    }catch(err){
        console.log("Error while fetching the user");
        res.status(500).send({
            message : "Internal Error found while fetching user by id"
        })
    }
};

//Update the user
exports.update = async (req,res) => {
    try{
        const user = await User.findOne({userId : req.params.id});

        user.name = req.body.name != undefined ? req.body.name : user.name;
    
        const updatedUser = await user.save();

        res.sendStatus(200).send({
            name : updatedUser.name,
            email : updatedUser.email,
            userId : updatedUser.userId
        });
    }catch(err){
        console.log("Internal error while updating", err.message);
        return res.status(500).send({
            message : "Error while updating user info"
        })
    }
};



//Get users by limit
exports.getUsersByLimit = async (req,res) => {
    try{
        const users = await User.find().limit(parseInt(req.query.limit));
        const listedUsers = {users};

        res.status(200).send(listedUsers);
    }catch(err){
        console.log("Internal Error while fetching all users data", err.message);
        return res.status(500).send({
            message : "Error while fetching all users data"
        })
    };   
}