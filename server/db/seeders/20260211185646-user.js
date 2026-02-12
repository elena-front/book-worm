"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [ ////users. множественное число ///
      {
        username: "admin",
        password: "123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user",
        password: "123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {}); //// удалитть 
  },
};
