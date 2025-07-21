const express = require('express');
const VeiculoController = require('../controllers/veiculo.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware');

const router = express.Router();

// Rota de cadastro de veículo
router.post('/veiculos', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VeiculoController.criar);

// Rotas para listar
router.get('/veiculos', AutenticacaoMiddleware.autenticarToken,AutorizacaoMiddleware.autorizar(['operador']), VeiculoController.listar);
router.get('/veiculos/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VeiculoController.listarPorId);

// Rota para atualizar
router.put('/veiculos/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VeiculoController.atualizar);

// Rota para deletar
router.delete('/veiculos/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.autorizar(['operador']), VeiculoController.deletar);

module.exports = router;
