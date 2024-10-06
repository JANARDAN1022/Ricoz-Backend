const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:[true,"Please  provide your First name"],
        maxlength:[30,"Name Cannot Exceed 30 Characters"],
     },
    LastName:{
        type:String,
        required:[true,"Please  provide your Last name"],
        maxlength:[30,"Last Name Cannot Exceed 30 Characters"],
    },
    Email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a Valid Email"]
    },
});



module.exports = mongoose.model("user",userSchema);