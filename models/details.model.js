const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
        trim : true
    },
    houseNumber : {
        type : Number,
        required : true,
        trim : true
    },
    address : {
        type : String,
        required : true,
        trim : true
    },
    city : {
        type : String,
        required : true,
        trim : true
    },
    state : {
        type : String,
        required : true,
        trim : true
    },
    pincode : {
        type : Number,
        required : true,
        minLength : 6,
        trim : true
    }
});

module.exports = mongoose.model("Detail", userDetailsSchema);

