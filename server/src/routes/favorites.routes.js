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
router.post("/", verifyAccessToken, addToFavorites);
router.get("/:user_id", verifyAccessToken, getUserFavorites);
router.delete("/", verifyAccessToken, removeFromFavorites);

module.exports = router;
