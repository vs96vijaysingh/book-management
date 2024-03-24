const express = require("express");
const router = express.Router();

const BookController = require("../controller/BookController");
const middleware = require("../middleware/auth");

router.get("/book", middleware.verifyToken, BookController.getAllBooks);
router.get("/book/:id", middleware.verifyToken, BookController.getBookDetail);
router.post("/book", middleware.verifyToken, BookController.createBook);
router.put("/book/:id", middleware.verifyToken, BookController.updateBook);
router.patch("/book", middleware.verifyToken, BookController.updateBookSegment);
router.delete("/book/:id", middleware.verifyToken, BookController.deleteBook);

module.exports = router;
