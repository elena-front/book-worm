const { Book, Review } = require("../../db/models");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).send("Tobi Pushka");
    }

    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};

// ✅ ОБНОВЛЕНО: принимает multipart/form-data + файл cover (multer)
const createBook = async (req, res) => {
  try {
    // multipart/form-data поля приходят в req.body
    // твой фронт шлёт: title, author, comment + cover (file)
    const { title, name, author, comment, description } = req.body;

    // поддерживаем оба варианта: title или name
    const finalName = (name || title || "").trim();
    const finalAuthor = (author || "").trim();
    const finalDescription = (description || comment || "").trim();

    if (!finalName || !finalAuthor) {
      return res.status(400).send("name/title и author обязательны");
    }

    // если файл загружен через multer: req.file
    let photo_url = "";
    if (req.file && req.file.filename) {
      photo_url = `/uploads/${req.file.filename}`;
    }

    const newBook = await Book.create({
      name: finalName,
      author: finalAuthor,
      description: finalDescription || "",
      photo_url,
      rating: 0,
    });

    res.status(201).json(newBook);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};

const getBookReviews = async (req, res) => {
  try {
    const bookId = req.params.id;

    const reviews = await Review.findAll({
      where: { book_id: bookId },
      order: [["id", "ASC"]],
    });

    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi: ${err}`);
  }
};

const getBookFull = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).send("Tobi Pushka");
    }

    const reviews = await Review.findAll({
      where: { book_id: bookId },
      order: [["id", "ASC"]],
    });

    res.status(200).json({ book, reviews });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};

const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const deleted = await Book.destroy({ where: { id: bookId } });

    if (!deleted) {
      return res.status(404).send("Книга не найдена");
    }

    res.status(200).send("Книга удалена");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Сори, ошибка сервера: ${err}`);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  getBookReviews,
  getBookFull,
  deleteBookById,
};
