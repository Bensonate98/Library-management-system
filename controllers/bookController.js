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
const retrieveBook = async (req, res)=>{
  try{
    const title = req.query.title;
    if(title){
      const book = await Book.findOne({title: { $regex: new RegExp(title, 'i') } });
      if(book == null){
      throw Error("invalid book");
    }
    return res.status(200).json({
      status: "success",
      code: 200, 
      message: "Book retrieved successfully",
      data: book
    });   
  }
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

//Update a boook
const updateBook = async (req, res)=>{
  try{
    const oldBook = req.query.title;
    const newBook = req.body;
    if(!oldBook){
      throw Error("query required");
    }
    if(Object.keys(newBook).length === 0){
      throw Error("update validation failed");
    }
    const book = await Book.findOneAndUpdate({title: { $regex: new RegExp(oldBook, "i")} }, newBook, {new: true});
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
    const title = req.query.title;
    if(!title){
      throw Error("query required");
    }
    const book = await Book.findOneAndDelete({title: { $regex: new RegExp(title, 'i') }});
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

module.exports = { addNewBook, retrieveBook, updateBook, deleteBook }