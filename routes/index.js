const express = require('express');
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedIn');
const isloggedowner = require('../middlewares/isLoggedOwner');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render('index', { error, loggedin: false, isAdmin: false });
});

router.get('/logout',(req,res) => {
    res.cookie("token", "");
    res.redirect("/");
});

router.get('/myaccount', (req, res) => {
    res.render("admin");
});

router.get('/shop', isloggedin, async (req,res)=>{
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products , success});
});

router.get('/cart', isloggedin, async (req,res)=>{
    let user = await userModel
    .findOne({email: req.user.email})
    .populate("cart");
    let success = req.flash("success");
    res.render("cart", {user, success} );
});

router.get('/addtocart/:productid', isloggedin, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to Cart");
    res.redirect("/shop");
});  

router.get('/delete/:productid', isloggedin, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    user.cart.pull(req.params.productid);
    await user.save();
    req.flash("success", "Item deleted");
    res.redirect("/cart");
});  



module.exports = router;