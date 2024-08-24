const express = require("express");
const app = express();
const path = require('path');
const dbgr = require("debug")("development:server");

const expressSession = require('express-session');
const flash = require('connect-flash');

const indexRouter = require('./routes/index'); 
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ownersRouter = require('./routes/ownersRouter');

const db = require('./config/mongoose-connection');
const cookieParser = require("cookie-parser");

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/owners', ownersRouter);


app.listen(3000, ()=>{
    dbgr("Server running on http://localhost:3000");
})