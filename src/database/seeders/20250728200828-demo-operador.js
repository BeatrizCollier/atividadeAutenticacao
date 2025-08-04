'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('operador', [
      {
        nome: 'Ana Silva',
        papel: 'operador',
        email: 'ana.silva@empresa.com',
        senha: await bcrypt.hash('senha123', 10),
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Carlos Mendes',
        papel: 'operador',
        email: 'carlos.mendes@empresa.com',
        senha: await bcrypt.hash('segredo456', 10),
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Fernanda Souza',
        papel: 'cliente',
        email: 'fernanda.souza@empresa.com',
        senha: await bcrypt.hash('fernanda789', 10),
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'João Oliveira',
        papel: 'operador',
        email: 'joao.oliveira@empresa.com',
        senha: await bcrypt.hash('joao321', 10),
        criado_em: new Date(),
        atualizado_em: new Date()
      },
      {
        nome: 'Mariana Costa',
        papel: 'cliente',
        email: 'mariana.costa@empresa.com',
        senha: await bcrypt.hash('mariana456', 10),
        criado_em: new Date(),
        atualizado_em: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('operador', null, {});
  }
};
