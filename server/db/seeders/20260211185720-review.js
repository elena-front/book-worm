"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Reviews", [
      {
        user_id: 1,
        book_id: 1,
        rating: 5,
        comment: "Amazing book!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        book_id: 1,
        rating: 4,
        comment: "Very deep and interesting.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        book_id: 2,
        rating: 5,
        comment: "Adventure masterpiece!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
