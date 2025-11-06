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

router.get('/shop', isloggedin, async (req, res) => {
    try {
        const { category, featured, sort } = req.query;
        
        // Build query
        let query = {};
        if (category) {
            query.category = category;
        }
        if (featured === 'true') {
            query.featured = true;
        }
        
        // Build sort
        let sortOption = {};
        if (sort === 'price-low') {
            sortOption.price = 1;
        } else if (sort === 'price-high') {
            sortOption.price = -1;
        } else if (sort === 'newest') {
            sortOption.createdAt = -1;
        } else if (sort === 'rating') {
            sortOption.rating = -1;
        } else {
            sortOption.createdAt = -1; // Default: newest first
        }
        
        // Get products based on query
        let products = await productModel.find(query).sort(sortOption);
        
        // Get featured products for the featured section
        let featuredProducts = await productModel.find({ featured: true }).limit(4);
        
        // Get categories with product counts
        const categories = await productModel.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        
        let success = req.flash("success");
        
        res.render("shop", { 
            products, 
            featuredProducts,
            categories,
            currentCategory: category || 'all',
            currentSort: sort || 'newest',
            success 
        });
    } catch (error) {
        console.error('Shop page error:', error);
        req.flash("error", "Error loading products");
        res.redirect("/");
    }
});

router.get('/cart', isloggedin, async (req,res)=>{
    let user = await userModel
    .findOne({email: req.user.email})
    .populate("cart.product");
    let success = req.flash("success");
    res.render("cart", {user, success} );
});

router.get('/user/dashboard', isloggedin, async (req,res)=>{
    let user = await userModel
    .findOne({email: req.user.email})
    .populate("cart.product");
    res.render("user-dashboard", {user} );
});

router.get('/user/profile/edit', isloggedin, async (req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    let success = req.flash("success");
    let error = req.flash("error");
    res.render("edit-profile", {user, success, error} );
});

router.post('/user/profile/update', isloggedin, async (req,res)=>{
    try {
        const { fullname, contact } = req.body;
        await userModel.findOneAndUpdate(
            {email: req.user.email},
            { fullname, contact: contact || null },
            { runValidators: true }
        );
        req.flash("success", "Profile updated successfully!");
        res.redirect("/user/profile/edit");
    } catch (error) {
        console.error('Profile update error:', error);
        req.flash("error", "Error updating profile");
        res.redirect("/user/profile/edit");
    }
});

router.post('/user/password/update', isloggedin, async (req,res)=>{
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const bcrypt = require('bcrypt');
        
        let user = await userModel.findOne({email: req.user.email});
        
        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            req.flash("error", "Current password is incorrect");
            return res.redirect("/user/profile/edit");
        }
        
        // Check if new passwords match
        if (newPassword !== confirmPassword) {
            req.flash("error", "New passwords do not match");
            return res.redirect("/user/profile/edit");
        }
        
        // Hash and update new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        
        req.flash("success", "Password updated successfully!");
        res.redirect("/user/profile/edit");
    } catch (error) {
        console.error('Password update error:', error);
        req.flash("error", "Error updating password");
        res.redirect("/user/profile/edit");
    }
});

router.get('/addtocart/:productid', isloggedin, async (req,res)=>{
    try {
        let user = await userModel.findOne({email: req.user.email});
        
        // Check if product already exists in cart (handle both old and new structure)
        const existingItem = user.cart.find(item => {
            const productId = item.product ? item.product.toString() : item.toString();
            return productId === req.params.productid;
        });
        
        if (existingItem) {
            // If old structure (direct ID), convert to new structure
            if (!existingItem.product) {
                const index = user.cart.indexOf(existingItem);
                user.cart[index] = {
                    product: existingItem,
                    quantity: 2
                };
            } else {
                // Increase quantity if already in cart (new structure)
                existingItem.quantity += 1;
            }
            req.flash("success", "Quantity updated in cart");
        } else {
            // Add new item to cart (new structure)
            user.cart.push({
                product: req.params.productid,
                quantity: 1
            });
            req.flash("success", "Added to Cart");
        }
        
        await user.save();
        res.redirect("/shop");
    } catch (error) {
        console.error('Add to cart error:', error);
        req.flash("error", "Error adding to cart");
        res.redirect("/shop");
    }
});  

router.get('/delete/:productid', isloggedin, async (req,res)=>{
    try {
        let user = await userModel.findOne({email: req.user.email});
        // Handle both old and new cart structure
        user.cart = user.cart.filter(item => {
            const productId = item.product ? item.product.toString() : item.toString();
            return productId !== req.params.productid;
        });
        await user.save();
        
        req.flash("success", "Item removed from cart");
        res.redirect("/cart");
    } catch (error) {
        console.error('Delete from cart error:', error);
        req.flash("error", "Error removing item");
        res.redirect("/cart");
    }
});

// Update quantity in cart
router.post('/cart/update/:productid', isloggedin, async (req, res) => {
    try {
        const { quantity } = req.body;
        let user = await userModel.findOne({email: req.user.email});
        
        // Handle both old and new cart structure
        const cartItem = user.cart.find(item => {
            const productId = item.product ? item.product.toString() : item.toString();
            return productId === req.params.productid;
        });
        
        if (cartItem) {
            // If old structure, convert to new structure
            if (!cartItem.product) {
                const index = user.cart.indexOf(cartItem);
                user.cart[index] = {
                    product: cartItem,
                    quantity: parseInt(quantity)
                };
            } else {
                // Update quantity for new structure
                cartItem.quantity = parseInt(quantity);
            }
            await user.save();
            req.flash("success", "Quantity updated");
        }
        
        res.redirect("/cart");
    } catch (error) {
        console.error('Update quantity error:', error);
        req.flash("error", "Error updating quantity");
        res.redirect("/cart");
    }
});  



module.exports = router;