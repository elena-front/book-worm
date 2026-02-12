require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const booksRoutes = require("./routes/books.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const favoritesRoutes = require("./routes/favorites.routes");

const app = express();
console.log("APP LOADED");

// (Vite) 
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("INCOMING:", req.method, req.url);
  next();
});

//  JSON (POST/PUT)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/books", booksRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/favorites", favoritesRoutes);

//
//
//
//

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
