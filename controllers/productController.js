const Product = require("../models/product");
const sendErrorResponse = require("../utils/validationError");
const mongoose = require('mongoose');


//Create new product
const productPost = async (req, res)=>{
  const{ productName } = req.body;
  try{
    const product = await Product.create({productName});
    res.status(201).json({message: "Product created sucessfully", id: product._id, product: productName});
  }
  catch(err){
    sendErrorResponse(err, res);
  }
};

// Retrieve product with product name as a query parameter
const productGet = async (req, res)=>{
  try{
    const productName = req.query.productName;
    if(!productName){
      throw Error("query parameter required");
    }
    const product = await Product.findOne({productName});
    if(product == null){
      throw Error("invalid product");
    }
    return res.status(200).json({id: product._id, product: product.productName});
  }
  catch(err){
    sendErrorResponse(err, res);
  } 
};

// Retrieve product with the id in a url
const productGetId = async (req, res)=>{
  try{
    let id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw Error("invalid product");
    }
    const product = await Product.findById(id);
    console.log(product)
    if(product == null){
      throw Error("invalid product");
    }
    return res.status(200).json({id: product._id, product: product.productName});
  }
  catch(err){
    sendErrorResponse(err, res);
  } 
};

//update product using product name as query parameter
const productPut = async (req, res)=>{
  try{
    const oldProduct = req.query.productName;
    const newProduct = req.body;
    if(!oldProduct){
      throw Error("query parameter required");
    }
    if(Object.keys(newProduct).length === 0){
      throw Error("update validation failed");
    }
    const product = await Product.findOneAndUpdate({productName: oldProduct}, newProduct, {new: true});
    if(product == null){
      throw Error("invalid product");
    }
    return res.status(200).json({message: "product updated successfully", id: product._id, product: product.productName});
  }
  catch(err){
    sendErrorResponse(err, res);
  }
};

// Update product with the id in a url
const productPutId = async (req, res)=>{
  try{
    const id = req.params.id;
    const newProduct = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw Error("invalid product");
    }
    if(Object.keys(newProduct).length === 0){
      throw Error("update validation failed");
    }
    const product = await Product.findByIdAndUpdate(id, newProduct, {new: true});
    console.log(product)
    if(product == null){
      throw Error("invalid product");
    }
    return res.status(200).json({message: "product updated successfully", id: product._id, product: product.productName});
  }
  catch(err){
    sendErrorResponse(err, res);
  }  
};

//delete product using product name as query parameter
const productDelete = async (req, res)=>{
  try{
    const productName = req.query.productName;
    if(!productName){
      throw Error("query parameter required");
    }
    const product = await Product.findOneAndDelete({productName});
    if(product == null){
      throw Error("invalid product");
    }
    return res.status(200).json({message: "product deleted successfully"});
  }
  catch(err){
    sendErrorResponse(err, res);
  }
};

const productDeleteId = async (req, res)=>{
  try{
    const id = req.params.id;
    const newProduct = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw Error("invalid product");
    }
    const product = await Product.findByIdAndDelete(id, newProduct, {new: true});
    console.log(product)
    if(product == null){
      throw Error("invalid product");
    }
    return res.status(200).json({message: "product deleted successfully"});
  }
  catch(err){
    sendErrorResponse(err, res);
  }  
};

module.exports ={ productPost, productGet, productGetId, productPut, productPutId, productDelete, productDeleteId }