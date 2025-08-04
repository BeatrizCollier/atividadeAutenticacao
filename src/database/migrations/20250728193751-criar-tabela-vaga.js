'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('vaga', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vaga_numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      ocupado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      veiculoId: {
        type: Sequelize.INTEGER,
        allowNull: true, // Nulo se vaga estiver livre
        references: {
          model: "veiculo", //tabela de veículos
          key: "id",
        },
        onUpdate: "CASCADE"
      },
      horario_entrada: {
        type: Sequelize.TIME,
        allowNull: true,

      },
      horario_saida: {
        type: Sequelize.TIME,
        allowNull: true,
      },

    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('vaga');

  }
};
