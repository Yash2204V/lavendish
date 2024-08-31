const ownerModel = require("../models/owner-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateTokenOwner} = require('../utils/generateTokenOwner');

module.exports.registerOwner = async (req,res)=>{
    try{
        let {fullname, email, password} = req.body;
        let owner = await ownerModel.findOne({email: email});
        if (owner) {
            req.flash("error", "You already have an account, please login.");
            return res.redirect("/");
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.send(err.message);
                else{
                    let owner = await ownerModel.create({
                        email,
                        password: hash,
                        fullname,
                    });
                    let token = generateTokenOwner(owner);
                    res.cookie("token", token);
                    res.redirect("/owners/admin");
                }
            });
        });
    } catch(err){
        res.send(err.message);
    }
}

module.exports.loginOwner = async (req,res)=>{
    let {email, password} = req.body;
    let owner = await ownerModel.findOne({email: email});

        if (!owner) {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
        bcrypt.compare(password, owner.password, function(err, result) {
            if (result) {
                let token = generateTokenOwner(owner);
                res.cookie("token", token);
                res.redirect("/owners/admin");
              } else {
                req.flash("error", "Email or Password incorrect");
                return res.redirect("/owners/admin");
              }
        });
}

module.exports.logoutOwner = (req,res)=>{
    res.cookie("token", "");
    res.redirect("/");
}

