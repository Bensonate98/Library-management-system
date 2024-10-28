const Book = require("../models/book");
const sendErrorResponse = require("../utils/validationError");
const mongoose = require('mongoose');


//Create new product
const addNewBook = async (req, res)=>{
  try{
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Book added successfully", 
      data: newBook
    });
  }
  catch(err){
    sendErrorResponse(err, res);
  }
};

//Retrieve all books or retrieve a book by its title
const retrieveBooks = async (req, res)=>{
  try{
    const books = await Book.find();
    if(books.length === 0){
      return res.status(200).json({
        status: "success", 
        code: 200,
        message: "No books found in the library", 
        data: books
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",  
      message: "Books retrieved successfully", 
      data: books
    });
}
  catch(err){
    sendErrorResponse(err, res);
  }
};

//Retrieve a book by its id
const retrieveOneBook = async (req, res)=>{
  try{
    const {id} = req.params;
    if(!id){
      throw Error("query required");
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw Error("invalid book");
    }
    const book = await Book.findById(id);
    if(book.length === 0){
      return res.status(200).json({
        status: "success", 
        code: 200,
        message: "Book not found", 
        data: book
      });
    }
    return res.status(200).json({
      code: 200,
      status: "success",  
      message: "Book retrieved successfully", 
      data: book
    });
}
  catch(err){
    sendErrorResponse(err, res);
  }
};

//Update a book using the id
const updateBook = async (req, res)=>{
  try{
    const {id} = req.params;
    const newBook = req.body;
    if(!id){
      throw Error("query required");
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw Error("invalid book");
    }
    if(Object.keys(newBook).length === 0){
      throw Error("update validation failed");
    }
    const book = await Book.findByIdAndUpdate(id, newBook, {new: true});
    console.log(book)
    if(book == null){
      throw Error("invalid book");
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "book updated successfully",
      data: book
      });
  }
  catch(err){
    sendErrorResponse(err, res);
  }  
};

//delete a book
const deleteBook = async (req, res)=>{
  try{
    const {id} = req.params;
    if(!id){
      throw Error("query required");
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw Error("invalid book");
    }
    const book = await Book.findByIdAndDelete(id);
    if(book == null){
      throw Error("invalid book");
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      message: "book deleted successfully",
    });
  }
  catch(err){
    sendErrorResponse(err, res);
  }  
}

module.exports = { addNewBook, retrieveBooks, retrieveOneBook, updateBook, deleteBook }