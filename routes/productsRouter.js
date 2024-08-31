const express = require("express");
const router = express.Router();
const isloggedowner = require('../middlewares/isLoggedOwner');
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const ownerModel = require("../models/owner-model");

router.post('/create', isloggedowner, upload.single("image"), async (req, res) => {
    let owner = await ownerModel.findOne({email: req.owner.email});

    try{
        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        owner.products.push(product._id);
        await owner.save();
        req.flash("success", "Product Created Successfully")
        res.redirect("/owners/admin");
    }catch(err){
        res.send(err.message);
    }
})

router.get('/deleteAll', isloggedowner, async (req, res) => {
    let owner = await ownerModel.findOne({email: req.owner.email});
    owner.products = [];
    await owner.save();
        req.flash("success", "Deleted Successfully")
        res.redirect("/owners/myaccount");
    })
module.exports = router;