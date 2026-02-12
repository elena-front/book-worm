const express = require("express");
const router = express.Router();
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
    cb(null, path.join(__dirname, "..", "..", "uploads"));
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

// ✅ ВАЖНО: подключаем multer для поля cover
router.post("/", upload.single("cover"), createBook);

router.get("/:id/reviews", getBookReviews);
router.get("/:id/full", getBookFull);
router.get("/:id", getBookById);
router.delete("/:id", deleteBookById);

module.exports = router;
