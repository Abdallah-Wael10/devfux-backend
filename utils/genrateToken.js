const jwt = require('jsonwebtoken');
module.exports = async(playload)=>{
    const token = jwt.sign(playload,process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
    return token;
 
}