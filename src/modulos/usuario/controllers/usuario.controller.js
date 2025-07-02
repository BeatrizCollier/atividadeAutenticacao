const Usuario = require("../models/usuario.model");
const bcrypt =require('bcryptjs')

class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ msg: "Todos os campos devem serem preenchidos!" });
      }
      // criptografando a senha
      const senhaCriptografada = await bcrypt.hash(senha, 15);
      await Usuario.create({ nome, email, senha: senhaCriptografada });
      res.status(200).json({ msg: 'Usuario criado com sucesso' });
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message})
    }
  }
  static async perfil(req, res) {
    try {
      const { email } = req.usuario; // vindo do token

      // Busca mais dados se necessário
      const usuario = await Usuario.findOne({
        where: { email },
        attributes: ['nome', 'email'], // apenas os campos públicos
      });

      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      res.status(200).json({ perfil: usuario });
    } catch (error) {
      res.status(500).json({
        msg: "Erro ao buscar perfil.",
        erro: error.message
      });
    }
  }
}

module.exports = UsuarioController