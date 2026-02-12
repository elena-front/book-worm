'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Review, Favorite, Book }) {
      this.hasMany(Review, { foreignKey: 'user_id' });
      this.hasMany(Favorite, { foreignKey: 'user_id' });

      this.belongsToMany(Book, {
        through: Favorite,
        foreignKey: 'user_id',
        otherKey: 'book_id',
      });
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
