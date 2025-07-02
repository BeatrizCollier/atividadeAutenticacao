const express = require('express');
const UsuarioController = require('../controllers/usuario.controller')
const AutenticacaoMiddleware = require('../middleware/usuario.middleware') 

const router = express.Router()

// rota de cadastro
router.post('/cadastrar', UsuarioController.cadastrar)

// rota protegida para exibir perfil do aluno
router.get('/perfil', AutenticacaoMiddleware.autenticarToken, UsuarioController.perfil);

module.exports = router