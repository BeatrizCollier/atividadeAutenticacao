'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('operador', {

      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      papel: {
        type: Sequelize.ENUM('operador', 'cliente'),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });

    // Adicionar índices para otimização
    await queryInterface.addIndex('operador', ['email']);
    await queryInterface.addIndex('operador', ['papel']);
    
  },

  async down(queryInterface, Sequelize) {
   
    await queryInterface.dropTable('operador');
  
  }
};
