const mongoose = require("mongoose");
const{ Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Enter a product name"],
  }
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;