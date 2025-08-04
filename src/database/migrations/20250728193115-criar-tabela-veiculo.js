'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('veiculo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      placa: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      cor: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      proprietario_nome: {
        type: Sequelize.STRING,
        allowNull: false,

      },

    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('veiculo');

  }
};
