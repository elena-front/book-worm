'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Review, Favorite, User }) {
      this.hasMany(Review, { foreignKey: 'book_id' });
      this.hasMany(Favorite, { foreignKey: 'book_id' });

      this.belongsToMany(User, {
        through: Favorite,
        foreignKey: 'book_id',
        otherKey: 'user_id',
      });
    }
  }

  Book.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.TEXT,
      photo_url: DataTypes.STRING,
      rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );

  return Book;
};
