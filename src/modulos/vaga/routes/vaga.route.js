const express = require('express');
const VagaEstacionamentoController = require('../controllers/vaga.controller')


const router = express.Router()

// rota de cadastro
router.post('/vagas', VagaEstacionamentoController.criar)

//rotas de listar 
router.get('/vagas', VagaEstacionamentoController.listar)
router.get('/vagas/:id', VagaEstacionamentoController.listarPorId)

//rota de editar
router.put('/vagas/:id', VagaEstacionamentoController.atualizar)

//rota deletar por id
router.delete('/vagas/:id', VagaEstacionamentoController.deletar)


module.exports = router