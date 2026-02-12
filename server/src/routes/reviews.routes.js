const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  createReview,
} = require("../controllers/reviews.controller");

// POST /reviews
router.post("/", createReview);
router.get("/", getAllReviews);

module.exports = router;
