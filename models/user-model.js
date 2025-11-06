const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
        quantity: {
            type: Number,
            default: 0,
            min: 0
        }
    }],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
}, {
    timestamps: true
});

module.exports = mongoose.model("user", userSchema);