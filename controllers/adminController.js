const Product = require('../models/product-model');
const userModel = require('../models/user-model');

// Admin Dashboard
exports.getDashboard = async (req, res) => {
    try {
        const products = await Product.countDocuments();
        const users = await userModel.countDocuments();
        
        const recentProducts = await Product.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            stats: { products, users, orders: 0 },
            recentProducts,
            path: 'dashboard'
        });
    } catch (error) {
        console.error('Admin dashboard error:', error);
        res.status(500).send('Server Error');
    }
};

// Get all products for admin
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.render('admin/products', { 
            title: 'Manage Products',
            products,
            path: 'products'
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).send('Server Error');
    }
};

// Get all users for admin
exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find().sort({ createdAt: -1 });
        res.render('admin/users', { 
            title: 'Manage Users',
            users,
            path: 'users'
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).send('Server Error');
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        req.flash('success', 'Product deleted successfully');
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Delete product error:', error);
        req.flash('error', 'Error deleting product');
        res.redirect('/admin/products');
    }
};

// Update product status
exports.updateProductStatus = async (req, res) => {
    try {
        const { featured } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { featured });
        res.json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ success: false, message: 'Error updating product' });
    }
};
