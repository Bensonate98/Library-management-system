const sendErrorResponse = (err, res)=>{
  let error, errorResponse;
  if(err.message.includes("Product validation failed")){
    error = {error: "Enter a product name"};
    errorResponse = res.status(400).json(error);
  }
  if(err.message.includes("update validation failed")){
    error = {error: "Enter new product name"};
    errorResponse = res.status(400).json(error);
  }
  if(err.message.includes("query parameter required")){
    error = {error: "productName query parameter required"};
    errorResponse = res.status(400).json(error);
  }
  if(err.message.includes("invalid product")){
    error = {error: "product not found"};
    errorResponse = res.status(404).json(error);
  }
  return errorResponse;
}

module.exports = sendErrorResponse;