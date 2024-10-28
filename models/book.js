const mongoose = require("mongoose");
const{ Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Enter a book title"],
  },
  author: {
    type: String,
    required: [true, "Author's name required"],
  },
  genre: {
    type: String,
    required: [true, "Genre required"],
  },
  publicationDate: {
    type: String,
    required: [true, "Publication date required"],
  },
  availabilityStatus: {
    type: String,
    default: "available",
  },
  edition: {
    type: String,
    required: [true, "Edition required"],
  },
  summary: {
    type: String,
    required: [true, "Book summary required"],
  }
}, {timestamps: true});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;