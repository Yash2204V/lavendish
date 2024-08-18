const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require('path');

const userModel = require('./models/user-model');
const productModel = require('./models/product-model');

const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
})