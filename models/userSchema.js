const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobNo:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:
    {
        type: String,
    }
});

const User = new mongoose.model("user", userSchema);

module.exports = User;