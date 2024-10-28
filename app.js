const express = require("express");
const cors = require('cors');
const app = express();
const connectDb = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const startServer = async ()=>{
  try{
    await  connectDb();
    app.listen(PORT, ()=>{
      console.log(`app running at port ${PORT}`);
    })
  }catch(err){
    console.log(err, "Unable to start server");
  }
}
startServer();

//Routes
app.use(bookRoutes);

