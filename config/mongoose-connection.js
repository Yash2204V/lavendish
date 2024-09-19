const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
// require('dotenv').config(); 
// const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.zbg2m.mongodb.net/`;
mongoose
// .connect(`${MONGODB_URI}?retryWrites=true&w=majority&appName=Cluster0`)
.connect('mongodb://127.0.0.1:27017/e-commerce-project')
.then(function(){
    dbgr("Connected to MongoDB");
    
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;