"use strict";
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [ ////users. множественное число ///
      {
        username: "admin",
        password: await bcrypt.hash("123", 10),
        email: "admin@mail.com"
      },
      {
        username: "user",
        password: await bcrypt.hash("123", 10),
        email: "user@mail.com"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {}); //// удалитть 
  },
};
