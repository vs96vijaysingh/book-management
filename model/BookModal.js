const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
    },

    author: {
      type: String,
      required: [true, "Please enter author"],
    },

    publicationYear: {
      type: Number,
      required: [true, "Please enter publication year"],
    },
  },
  { timestamp: true }
);

const BookModel = mongoose.model("Books", bookSchema);
module.exports = BookModel;
