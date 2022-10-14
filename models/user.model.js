const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    userId : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 8,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 8,
        trim : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now()
        }
    },
    userDetailsInserted : {
        type : [mongoose.SchemaType.ObjectId],
        ref : "Detail"
    }
});

module.exports = mongoose.model("User", userSchema);