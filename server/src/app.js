require("dotenv").config();
const express = require("express");
const cors = require("cors");
const booksRoutes = require("./routes/books.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const favoritesRoutes = require("./routes/favorites.routes");

const app = express();
console.log("APP LOADED");

// (Vite) 
app.use(cors());

//  JSON (POST/PUT)
app.use(express.json());
app.use("/books", booksRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/favorites", favoritesRoutes);

//
//
//
//
app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.url);
  next();
});
///
//
//
//
// проверка что сервер жив
app.get("/", (req, res) => {
  try {
    console.log("HIT /");

    res.status(200).send("Шоколадка работает");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Сори, я содох: ${err}`);
  }
});

module.exports = app;
