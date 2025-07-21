const express = require('express');
const VagaEstacionamentoController = require('../controllers/vaga.controller');

const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware')
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware')


const router = express.Router()

// rota de cadastro
router.post('/vagas', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VagaEstacionamentoController.criar)

//rotas de listar 
router.get('/vagas', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VagaEstacionamentoController.listar)
router.get('/vagas/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VagaEstacionamentoController.listarPorId)

//rota de editar
router.put('/vagas/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VagaEstacionamentoController.atualizar)

//rota deletar por id
router.delete('/vagas/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VagaEstacionamentoController.deletar)

//rota para marcar vaga como ocupada (entrada do veículo)
router.post('/vagas/:id/ocupar', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VagaEstacionamentoController.ocuparVaga);

//rota para liberar vaga (saída do veículo)
router.post('/vagas/:id/liberar', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VagaEstacionamentoController.liberarVaga);


module.exports = router