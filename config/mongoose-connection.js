const mongoose = require("mongoose");
// const config = require("config");
const dbgr = require("debug")("development:mongoose");
require('dotenv').config(); 
// const MONGODB_URI = `${process.env.MONGODB_URI}`;

// let connectionInstance = mongoose.connect(MONGODB_URI)
// .then(function(){
//     dbgr("Connected to MongoDB");
// })
// .catch(function(err){
//     dbgr(err);
// })

// console.log(connectionInstance.connection.host);

const connectDB = async () => {
    try {        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        dbgr(`🗃️  MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

connectDB();

module.exports = mongoose.connection;