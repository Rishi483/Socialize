const express=require('express');
const dotenv=require('dotenv');
const dbConnect=require('./dbConnect');
const authRouter = require('./routers/authRouter');
const postRouter=require('./routers/postRouter');
const userRouter=require('./routers/userRouter');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const cloudinary=require('cloudinary').v2;
 
dotenv.config('./.env');
const app=express();

//configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET 
  });

//middlewares
app.use(express.json({limit:'10mb'}));
app.use(morgan('common'));
app.use(cookieParser());
app.use("*",cors({
    credentials:true,
    origin:process.env.FRONTEND_ADDRESS
}));

app.use('/auth',authRouter);
app.use('/posts',postRouter);
app.use('/user',userRouter);
app.get("/",(req,res)=>{
    res.status(200).send("OK From Server");
})

dbConnect();

const PORT=process.env.PORT || 4001;
app.listen(PORT,()=>{
    console.log("Listning on port "+PORT);
});