const express = require("express");
const router = express.Router();

// const { getAllBooks } = require("../controllers/books.controller");
const {
  getAllBooks,
  getBookById,
  createBook,
} = require("../controllers/books.controller");

// GET /books
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);

module.exports = router;
