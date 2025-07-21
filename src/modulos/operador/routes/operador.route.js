const express = require('express');
const OperadorController = require('../controllers/operador.controller')
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware') 

const router = express.Router()

// rota de cadastro
router.post('/operadores', OperadorController.cadastrar)

// rota protegida para exibir perfil do Operador
router.get('/operadores/me', AutenticacaoMiddleware.autenticarToken, OperadorController.perfil);

module.exports = router