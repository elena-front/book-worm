const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  createReview,
} = require("../controllers/reviews.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

// POST /reviews
//
//
//
//отзывчики
router.post("/", verifyAccessToken, createReview);
router.get("/", getAllReviews);

module.exports = router;
