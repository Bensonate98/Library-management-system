const sendErrorResponse = (err, res)=>{
  let error, errorResponse;
  if(err.message.includes("validation failed")){
    error = "Empty input field";
    errorResponse = res.status(400).json({
      status: "error", 
      code: 400, 
      message: error, 
      errors:{
        details: "The required input fields are not completely field"
      }
    });
  }

  if(err.message.includes("invalid book")){
    error = "Book not found";
    errorResponse = res.status(404).json({
      status: "error",
      code: 404,
      message: error, 
      errors:{
        details: "The book is not in the library"
      }
    });
  }

  if(err.message.includes("query required")){
    error = "requires a query param",
    errorResponse = res.status(400).json({
      status: "error",
      code: 400,
      message: error
    })
  }
  return errorResponse;
}

module.exports = sendErrorResponse;