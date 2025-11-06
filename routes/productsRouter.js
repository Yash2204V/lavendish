const express = require("express");
const router = express.Router();
const isloggedowner = require('../middlewares/isLoggedOwner');
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
const ownerModel = require("../models/owner-model");

router.post('/create', isloggedowner, upload.single("image"), async (req, res) => {
    let owner = await ownerModel.findOne({email: req.owner.email});

    try{
        let {
            name, 
            description, 
            price, 
            discount, 
            category, 
            tags, 
            stock, 
            rating, 
            featured,
            bgcolor, 
            panelcolor, 
            textcolor
        } = req.body;
        
        // Convert tags string to array if provided
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];
        
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            description: description || '',
            price,
            discount: discount || 0,
            category: category || 'general',
            tags: tagsArray,
            stock: stock || 0,
            rating: rating || 0,
            featured: featured === 'on' || featured === true,
            bgcolor: bgcolor || '#ffffff',
            panelcolor: panelcolor || '#f8fafc',
            textcolor: textcolor || '#1e293b',
        });
        owner.products.push(product._id);
        await owner.save();
        req.flash("success", "Product Created Successfully")
        res.redirect("/owners/admin");
    }catch(err){
        console.error('Product creation error:', err);
        req.flash("error", "Error creating product: " + err.message);
        res.redirect("/owners/admin");
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