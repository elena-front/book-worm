'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Books',
      [
        {
          name: '1984',
          author: 'George Orwell',
          description:
            '1984 год по моему мнению был один из самых важных и сложных годов в жизни человека',
          photo_url:
            'https://media.newyorker.com/photos/600b1c3fc2d8e97988b833af/master/w_2240,c_limit/Rosen-1984.jpg',
          rating: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Idiot',
          author: 'Fyodor Dostoevsky',
          description: 'Это книга о судьбе и поэтике Фёдора Достоевского',
          photo_url: 'https://covers.libro.fm/9781483089102_1120.jpg',
          rating: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
