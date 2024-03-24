const BookModel = require("../model/BookModal");

const getAllBooks = async (req, res) => {
  try {
    let { author, year } = req.query;
    let queries = {};
    if (author) {
      queries.author = author;
    }
    if (year) {
      queries.publicationYear = year;
    }

    const response = await BookModel.find(queries);

    return res.status(200).json({
      status: "success",
      message: "book listed",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};
const getBookDetail = async (req, res) => {
  try {
    const bookId = req.params.id;
    const response = await BookModel.findById(bookId);
    return res.status(200).json({
      status: "success",
      message: "book detail",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

const createBook = async (req, res) => {
  const reqData = req.body;
  try {
    const newBook = new BookModel(reqData);
    const response = await newBook.save();
    return res.status(201).json({
      status: "success",
      message: "book created",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const reqData = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "BookId  are required" });
    }
    const newBook = new BookModel(reqData);
    const response = await BookModel.updateOne({ _id: id }, reqData);
    return res.status(200).json({
      status: "success",
      message: "book updated",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

const updateBookSegment = async (req, res) => {
  try {
    const reqData = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "BookId  is required" });
    }
    const response = await User.findByIdAndUpdate(bookId, reqData);
    return res
      .status(200)
      .json({ status: "success", message: "book updated", data: response });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const response = await BookModel.deleteOne({ _id: bookId });
    return res.status(200).json({
      status: "success",
      message: "book deleted",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

module.exports = {
  getAllBooks,
  getBookDetail,
  createBook,
  updateBook,
  updateBookSegment,
  deleteBook,
};
