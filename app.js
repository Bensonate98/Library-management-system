const express = require("express");
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express();
const connectDb = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const fs = require("fs");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// Load Swagger JSON file
const swaggerDocument = JSON.parse(fs.readFileSync('./openapi.json', 'utf8'));
// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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
app.use(productRoutes);

module.exports= app;

