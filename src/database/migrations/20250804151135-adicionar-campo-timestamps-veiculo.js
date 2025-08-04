'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('veiculo', 'criado_em',
      { 
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('veiculo', 'atualizado_em',
      { 
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('veiculo','criado_em');
    await queryInterface.removeColumn('veiculo','atualizado_em');
  }
};
