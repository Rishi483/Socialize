const mongoose=require('mongoose');

module.exports=async()=>{
    const mongoUri='mongodb+srv://rishijoshi483:rishi483@cluster0.6hg80kv.mongodb.net/?retryWrites=true&w=majority';
    try{
        const connect=await mongoose.connect(mongoUri,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log('MongoDB Connected: '+connect.connection.host);
    }
    catch(e){
        console.log(e);
        process.exit(1);
    }
}