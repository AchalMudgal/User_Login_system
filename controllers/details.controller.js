//This file will have the logic to user details controlle

const User = require("../models/user.model");
const Details = require("../models/details.model");


exports.createUserDetails = async (req,res) => {
    try{
        const user = await User.findOne({userId : req.body.userId});

        const detailsObject = {
            userId : req.body.userId,
            houseNumber : req.body.houseNumber,
            address : req.body.address,
            city : req.body.city,
            state : req.body.state,
            pincode : req.body.pincode
        };

        const detailsCreated = await Details.create(detailsObject);
        console.log(detailsCreated);

        if(detailsCreated){
            //Update user document
            user.userDetailsInserted.push(detailsCreated);
            await user.save();
        }
        console.log(detailsCreated._id);

        res.status(201).json({status : 1, detailsCreated});
    }catch(err){
        console.log("Internal error while creating details of the user",err.message);
        res.status(500).json({status : 0,
            message : "Error while creating the details of the user"
        })
    }
};

exports.update = async (req,res) => {
    try{
        const userDetails = await Details.findOne({"_id" : req.body.id});

        //Update the details of the user

        userDetails.houseNumber = req.body.houseNumber != undefined ? req.body.houseNumber : userDetails.houseNumber;
        userDetails.address = req.body.address != undefined ? req.body.address : userDetails.address;
        userDetails.city = req.body.city != undefined ? req.body.city : userDetails.city;
        userDetails.state = req.body.state != undefined ? req.body.state : userDetails.state;
        userDetails.pincode = req.body.pincode != undefined ? req.body.pincode : userDetails.pincode;

        const updatedDetails = await userDetails.save();

        res.status(200).json({status : 1, updatedDetails});
    }catch(err){
        console.log("Internal error while updating user details");
        res.status(500).json({status : 0,
            message : "Error while updating the user details"
        })
    }
};

exports.getOneTicket = async (req, res) => {
    const userdetail = await Details.findOne({userId: req.body.userId});
    console.log(userdetail);
    res.status(200).send(userdetail);
}