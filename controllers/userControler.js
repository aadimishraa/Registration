const User = require('../models/userSchema')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const session = require("express-session")

const signup = async (req, res) => {
    try {
        const {name, email, mobNo, password} = req.body;
        if(!(name && email && mobNo && password)){
            return res.send("Enter All Details");
        }

        const existingUser = await User.findOne({email: email})
        if(existingUser){
            return res.send("User Exists with this Mail");
        }

        const encPassword = await bcrypt.hash(password, 10);
        const user = User.create({
            name, 
            email, 
            mobNo, 
            password: encPassword
        });
        req.session.user = {email};
        const payload = {email: email};
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({...payload}, secretKey); 
        user.token = token;
        return res.redirect("/homepage.hbs");

    }
    catch(error){
        console.log(error);
        return res.send("Can't Sign you up because of redundant data");
    }
};


const login =  async (req, res) => {
    try{
        const loggedUser = await User.findOne({email: req.body.email});
        if(!loggedUser){
            return res.send("User not exist with this Credentials");
        }
        const {email, password} = req.body;
        const matchPassword = await bcrypt.compare(password, loggedUser.password);
        if(!matchPassword){
            return res.send("Invalid Password")
        }

        const token = jwt.sign({email: loggedUser.email}, process.env.SECRET_KEY);
        req.session.user = {email}
        console.log(req.session)
        return res.redirect("/homepage.hbs");
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
};

module.exports = {
    signup,
    login
};