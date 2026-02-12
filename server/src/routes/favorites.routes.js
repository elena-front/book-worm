const express = require("express");
const router = express.Router();

const {
  addToFavorites,
  getUserFavorites,
  removeFromFavorites,
} = require("../controllers/favorites.controller");
///
///
///
/// сладкая любовь
// POST /favorites
router.post("/", addToFavorites);
router.get("/:user_id", getUserFavorites);
router.delete("/", removeFromFavorites);

module.exports = router;
