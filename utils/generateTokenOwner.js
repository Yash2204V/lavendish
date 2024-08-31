const jwt = require('jsonwebtoken');

module.exports.generateTokenOwner = (owner) =>{
    return jwt.sign({email: owner.email, id:owner._id}, process.env.JWT_KEY);
}