const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}?retryWrites=true&w=majority&appName=Cluster0`)
.then(function(){
    dbgr("Connected to MongoDB");
    
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;