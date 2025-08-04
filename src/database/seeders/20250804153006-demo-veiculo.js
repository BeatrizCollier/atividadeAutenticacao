'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('veiculo', [
      {
        placa: 'ABC1234',
        modelo: 'Gol',
        cor: 'Prata',
        proprietario_nome: 'João Silva',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        placa: 'XYZ5678',
        modelo: 'Uno',
        cor: 'Vermelho',
        proprietario_nome: 'Maria Souza',
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        placa: 'JKL9876',
        modelo: 'Civic',
        cor: 'Preto',
        proprietario_nome: 'Carlos Oliveira',
        criado_em: new Date(),
        atualizado_em: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('veiculo', null, {});
  }
};
