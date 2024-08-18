const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: Boolean,
    panelcolor: String,
    textcolor: String
});

module.exports = mongoose.model("product", productSchema);