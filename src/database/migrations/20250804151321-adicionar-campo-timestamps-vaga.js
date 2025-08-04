'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('vaga', 'criado_em',
      { 
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('vaga', 'atualizado_em',
      { 
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('vaga','criado_em');
    await queryInterface.removeColumn('vaga','atualizado_em');
  }
};
