const User=require('../models/User')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { error, success } = require('../utils/responseWrapper');

const signupController=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!email || !password || !name){
           return res.send(error(400,'All Fields Are Required'));
        }

        const oldUser=await User.findOne({email});
        if(oldUser){
            return res.send(error(409,'User is already registered'));
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email, 
            password:hashedPassword
        });
        return res.send(success(201,'user created successfully'));
    }
    catch(e){
        return res.send(error(500,e));
    }
}

const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.send(error(400,'All Fields Are Required'));
        }

        const oldUser=await User.findOne({email}).select('+password');
        if(!oldUser){
            return res.send(error(404,'User is not registered'));
        }
        const matched=await bcrypt.compare(password,oldUser.password);
        if(!matched){
            return res.send(error(403,"Passwords doesn't match"));
        }
        const accessToken=generateAccessToken({
            _id:oldUser._id,
        });
        const refreshToken=generateRefreshToken({
            _id:oldUser._id,
        });
        res.cookie('jwt',refreshToken,{
            httpOnly:true,
            secure:true
        })
        return res.send(success(201,{accessToken}));
    }
    catch(e){
        return res.send(error(500,e));
    }
}
//this api will check the refresh token validity and generate new access token
const refreshAccessTokenController=async (req,res)=>{
    const cookies=req.cookies;
    if(!cookies.jwt){
        return res.send(error(401,"Refresh token is required"));
    }
    const refreshToken=cookies.jwt;
    try{
        const verify=jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY)
        const id=verify._id;
        const accessToken=generateAccessToken({_id:id});
        return res.send(success(201,{accessToken}));
    }
    catch(e){
        console.log(e);
        return res.send(error(401,"Invalid Refresh Token"));
    }
}

const logOutController=async(req,res)=>{
    try {
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true
        })
        return res.send(success(200,'user logged out'));
    } catch (e) {
        return res.send(error(500,e.message));
    }
}

//internal function
const generateAccessToken=(data)=>{
    const token=jwt.sign(data,process.env.JWT_SECRET_KEY,{
        expiresIn:'15m'
    });
    return token;
}
const generateRefreshToken=(data)=>{
    const token=jwt.sign(data,process.env.JWT_REFRESH_KEY,{
        expiresIn:'1y'
    });
    return token;
}

module.exports={signupController,loginController,refreshAccessTokenController,logOutController};