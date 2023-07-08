const jwt=require('jsonwebtoken');
const {error}=require('../utils/responseWrapper');
const User = require('../models/User');

module.exports=async(req,res,next)=>{
    if(!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
        return res.send(error(401,'Authorization header is required'));
    }
    const accessToken=req.headers.authorization.split(" ")[1];
    
    try{
        const verify=jwt.verify(accessToken,process.env.JWT_SECRET_KEY)
        req._id=verify._id;
        const user=await User.findById(req._id);
        if(!user){
            return res.send(error(404,"User is not registered"));
        }
        next();
    }
    catch(e){
        console.log(e);
        return res.send(error(401,'Invalid Access Key'));
    }
}