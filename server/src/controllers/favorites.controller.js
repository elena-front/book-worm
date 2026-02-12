const { Favorite } = require("../../db/models");

const addToFavorites = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
      return res.status(400).send("user_id и book_id обязательны"); /// чтобы были, чтобы создавлались 
    }

    const favorite = await Favorite.create({
      user_id,
      book_id,
    });

    res.status(201).json(favorite);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.user_id;

    const favorites = await Favorite.findAll({ /// любимые книженции 
      where: { user_id: userId },
      order: [["book_id", "ASC"]],
    });

    res.status(200).json(favorites);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};
const removeFromFavorites = async (req, res) => {
  try {
    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
      return res.status(400).send("user_id и book_id обязательны");
    }

    const deleted = await Favorite.destroy({ /// удалить книженции 
      where: { user_id, book_id },
    });

    if (!deleted) {
      return res.status(404).send("Запись в избранном не найдена");
    }

    res.status(200).send("Удалено из избранного");
  } catch (err) {
    console.log(err);
    res.status(500).send(`Tobi Pushka: ${err}`);
  }
};

module.exports = {
  addToFavorites,
  getUserFavorites,
  removeFromFavorites,
};
