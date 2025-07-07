const express = require('express');
const VagaEstacionamentoController = require('../controllers/vaga.controller');

const AutenticacaoMiddleware = require('../../usuario/middleware/usuario.middleware')


const router = express.Router()

// rota de cadastro
router.post('/vagas', AutenticacaoMiddleware.autenticarToken, VagaEstacionamentoController.criar)

//rotas de listar 
router.get('/vagas', AutenticacaoMiddleware.autenticarToken, VagaEstacionamentoController.listar)
router.get('/vagas/:id', AutenticacaoMiddleware.autenticarToken, VagaEstacionamentoController.listarPorId)

//rota de editar
router.put('/vagas/:id', AutenticacaoMiddleware.autenticarToken, VagaEstacionamentoController.atualizar)

//rota deletar por id
router.delete('/vagas/:id', AutenticacaoMiddleware.autenticarToken, VagaEstacionamentoController.deletar)


module.exports = router