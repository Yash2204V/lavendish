const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        default: 'general',
        index: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    featured: {
        type: Boolean,
        default: false
    },
    bgcolor: {
        type: String,
        default: '#ffffff'
    },
    panelcolor: {
        type: String,
        default: '#f8fafc'
    },
    textcolor: {
        type: String,
        default: '#1e293b'
    }
}, {
    timestamps: true
});

// Text index for search
productSchema.index({
    name: 'text',
    description: 'text',
    category: 'text',
    tags: 'text'
});

// Virtual for discounted price
productSchema.virtual('discountedPrice').get(function() {
    return this.price * (1 - (this.discount / 100));
});

module.exports = mongoose.model("product", productSchema);