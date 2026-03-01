const mongoose = require("mongoose");

// MongoDB Connection using async await 
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB SuccessFully Connected')
    }catch(err){
       console.log('MongoDB Connection Failed:',err.message)
    }
};

module.exports = connectDB;