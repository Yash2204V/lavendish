const express = require('express');
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');

router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render('index', { error: error });
});

router.get('/shop', isloggedin, async (req,res)=>{
    let products = await productModel.find();
    res.render("shop", { products });
});

module.exports = router;