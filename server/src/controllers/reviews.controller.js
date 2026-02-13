// const { Review } = require("../../db/models");

// const createReview = async (req, res) => {
//   try {
//     const { user_id, book_id, rating, comment } = req.body;

//     if (!user_id || !book_id || rating === undefined) {
//       return res.status(400).send("user_id, book_id и rating обязательны");
//     }

//     const newReview = await Review.create({
//       user_id,
//       book_id,
//       rating,
//       comment: comment || "",
//     });

//     res.status(201).json(newReview);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(`Сори, ошибка сервера: ${err}`);
//   }
// };

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};

// module.exports = {
//   getAllReviews,
//   createReview,
// };

const { Review, Book, sequelize } = require("../../db/models");

const createReview = async (req, res) => {
  try {
    const { user_id, book_id, rating, comment } = req.body;

    if (!user_id || !book_id || rating === undefined) {
      return res.status(400).send("user_id, book_id и rating обязательны");
    }

    //   отзыв
    const newReview = await Review.create({
      user_id,
      book_id,
      rating,
      comment: comment || "",
    });

    // посчитаю  (AVG) - 1234
    const avgResult = await Review.findOne({
      where: { book_id },
      attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "avgRating"]],
      raw: true,
    });

    let avgRating = Number(avgResult.avgRating) || 0;
    avgRating = Math.round(avgRating * 100) / 100; // округлим до 2 знаков

  //) обновляем  
    await Book.update({ rating: avgRating }, { where: { id: book_id } });

    res.status(201).json(newReview);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};

module.exports = {
  getAllReviews,
  createReview,
};
