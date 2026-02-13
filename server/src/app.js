require("dotenv").config();
const express = require("express");
const path = require("path");
const booksRoutes = require("./routes/books.routes");
const reviewsRoutes = require("./routes/reviews.routes");
const favoritesRoutes = require("./routes/favorites.routes");
const authRoutes = require("./routes/auth.routes");
const serverConfig = require("./config/serverConfig");

const PORT = process.env.PORT || 3000;

const app = express();
serverConfig(app)
console.log("APP LOADED");

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
app.use("/auth", authRoutes);

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

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
})

module.exports = app;
