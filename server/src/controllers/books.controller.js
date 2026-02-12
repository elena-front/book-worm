const { Book, Review } = require("../../db/models");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ order: [["id", "ASC"]] }); /// по возрастанию
    // ASC = по возрастанию
    // DESC = по убыванию
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};
const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id); /// по айдишнику 

    if (!book) {
      return res.status(404).send("Tobi Pushka");
    }

    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};
const createBook = async (req, res) => {
  try {
    const { name, author, description, photo_url } = req.body;

    if (!name || !author) {
      return res.status(400).send("name и author обязательны");
    }

    const newBook = await Book.create({ // новая книженция
      name,
      author,
      description: description || "",
      photo_url: photo_url || "",
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
      where: { book_id: bookId }, /// бестолковый айдишник// находим книшку
      order: [["id", "ASC"]],
    });
    /////возвращает отзывы конкретной книги
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
  //   fetch('/books/3')
  // fetch('/books/3/reviews')
};

const getBookFull = async (req, res) => { /// все книженции  и его уникалки 
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

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  getBookReviews,
  getBookFull,
};
