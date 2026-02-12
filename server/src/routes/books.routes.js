const express = require("express");
const router = express.Router();

// const { getAllBooks } = require("../controllers/books.controller");
const {
  getAllBooks,
  getBookById,
  createBook,
  getBookReviews,
} = require("../controllers/books.controller");

// GET /books
router.get("/", getAllBooks);
router.post("/", createBook);
router.get("/:id/reviews", getBookReviews);
router.get("/:id", getBookById);

module.exports = router;
