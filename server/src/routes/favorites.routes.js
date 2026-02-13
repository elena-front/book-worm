const express = require("express");
const router = express.Router();

const {
  addToFavorites,
  getUserFavorites,
  removeFromFavorites,
} = require("../controllers/favorites.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");
///
///
///
/// сладкая любовь
// POST /favorites
router.post("/:book_id", verifyAccessToken, addToFavorites);
router.get("/", verifyAccessToken, getUserFavorites);
router.delete("/:book_id", verifyAccessToken, removeFromFavorites);

module.exports = router;
