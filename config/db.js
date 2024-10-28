const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async ()=>{
  try{
    await mongoose.connect(process.env.DB_URI);

    console.log("database connected");
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectDb;



