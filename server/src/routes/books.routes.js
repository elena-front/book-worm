const express = require("express");
const router = express.Router();
const verifyAccessToken = require('../middleware/verifyAccessToken')

// const { getAllBooks } = require("../controllers/books.controller");
const {
  getAllBooks,
  getBookById,
  createBook,
  getBookReviews,
  getBookFull,
  deleteBookById,
} = require("../controllers/books.controller");

// GET /books
router.get("/", getAllBooks);
router.post("/", verifyAccessToken, createBook);
router.get("/:id/reviews", getBookReviews);
router.get("/:id", getBookById);
router.get("/:id/full", getBookFull);
router.delete('/:id', verifyAccessToken, deleteBookById);


module.exports = router;
