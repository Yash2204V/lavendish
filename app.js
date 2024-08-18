const express = require("express");
const app = express();
const path = require('path');

const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ownersRouter = require('./routes/ownersRouter');

const db = require('./config/mongoose-connection');
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);


app.listen(3000, ()=>{
    console.log("Server running on http://localhost:3000");
})