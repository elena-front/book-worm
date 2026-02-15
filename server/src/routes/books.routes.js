const express = require("express");
const router = express.Router();
const verifyAccessToken = require('../middleware/verifyAccessToken')
const path = require("path");
const multer = require("multer");

const {
  getAllBooks,
  getBookById,
  createBook,
  getBookReviews,
  getBookFull,
  deleteBookById,
} = require("../controllers/books.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "uploads"));  //hello
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 6 * 1024 * 1024 }, // 6MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
    cb(ok ? null : new Error("Поддерживаются только JPG/PNG/WebP"), ok);
  },
});

// GET /books
router.get("/", getAllBooks);
//router.post("/", verifyAccessToken, createBook);

router.post("/", verifyAccessToken, upload.single("cover"),
  createBook
);

// ✅ ВАЖНО: подключаем multer для поля cover
//router.post("/", upload.single("cover"), createBook);

router.get("/:id/reviews", getBookReviews);
router.get("/:id/full", getBookFull);
router.delete('/:id', verifyAccessToken, deleteBookById);
router.get("/:id", getBookById);

module.exports = router;
