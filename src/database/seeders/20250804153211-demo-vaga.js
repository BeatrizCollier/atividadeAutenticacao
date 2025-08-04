'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vaga', [
      {
        vaga_numero: 1,
        ocupado: false,
        veiculoId: null,
        horario_entrada: null,
        horario_saida: null,
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        vaga_numero: 2,
        ocupado: true,
        veiculoId: 1, 
        horario_entrada: '08:30:00',
        horario_saida: null,
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        vaga_numero: 3,
        ocupado: true,
        veiculoId: 2, 
        horario_entrada: '09:15:00',
        horario_saida: '11:45:00',
        criado_em: new Date(),
        atualizado_em: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vaga', null, {});
  }
};
