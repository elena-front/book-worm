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

    static validateEmail(email) {
      const emailPattern = /^[A-z0-9!-_%.]+@[A-z0-9.-]+\.[A-z]{2,}$/;
      return emailPattern.test(email);
    }

    static validatePassword(password) {
      const hasUppercase = /[A-Z]/;
      const hasLowercase = /[a-z]/;
      const hasDigits = /\d/;
      const hasSpecialCharacters = /[!@#$%^&*(),.:"{}|<>]/;
      const isValidLength = password.length >= 8;

      if (
        !hasUppercase.test(password) ||
        !hasLowercase.test(password) ||
        !hasDigits.test(password) ||
        !hasSpecialCharacters.test(password) ||
        !isValidLength
      ) {
        return false;
      }
      return true;
    }

    static validateSignUpData(data) {
      const { username, email, password } = data;
      if (
        !username ||
        typeof username !== 'string' ||
        username.trim().length === 0
      ) {
        return {
          isValid: false,
          error: "Имя пользователя не должно быть пустым"
        }
      }

      if (
        !email ||
        typeof email !== 'string' ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          error: 'Ошибка валидации адреса электронной почты',
        }
      }
      if (
        !password ||
        typeof password !== 'string' ||
        password.trim().length === 0 ||
        !this.validatePassword(password)
      ) {
        return {
          isValid: false,
          error: 'Пароль не соответствует критериям валидации',
        };
      }

      return { isValid: true, error: null };
    }

    static validateSignInData(data) {
      const { email, password } = data;

      if (
        !email ||
        typeof email !== 'string' ||
        email.trim().length === 0 ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          error: 'Ошибка валидации адреса электронной почты',
        };
      }

      if (
        !password ||
        typeof password !== 'string' ||
        password.trim().length === 0
      ) {
        return {
          isValid: false,
          error: 'Пароль не соответствует критериям валидации',
        };
      }

      return { isValid: true, error: null };
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (newUser) => {
          newUser.email = newUser.email.toLowerCase().trim();
        }
      }
    }
  );
  return User;
};
