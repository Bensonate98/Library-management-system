const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async ()=>{
  try{
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.skucxh1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);

    console.log("database connected");
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDb;



