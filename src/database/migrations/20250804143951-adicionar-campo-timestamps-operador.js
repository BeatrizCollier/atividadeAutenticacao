'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('operador', 'criado_em',
      { 
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    });
    await queryInterface.addColumn('operador', 'atualizado_em',
      { 
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    });  
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.removeColumn('operador','criado_em');
    await queryInterface.removeColumn('operador','atualizado_em');
  }
};
