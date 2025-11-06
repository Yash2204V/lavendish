const express = require('express');
const router = express.Router();
const isloggedowner = require('../middlewares/isLoggedOwner');
const adminController = require('../controllers/adminController');

// Admin Dashboard
router.get('/', isloggedowner, adminController.getDashboard);

// Products Management
router.get('/products', isloggedowner, adminController.getProducts);

// Users Management
router.get('/users', isloggedowner, adminController.getUsers);

// Delete Product
router.get('/products/:id/delete', isloggedowner, adminController.deleteProduct);

// Toggle Featured Status
router.post('/products/:id/featured', isloggedowner, adminController.updateProductStatus);

module.exports = router;
