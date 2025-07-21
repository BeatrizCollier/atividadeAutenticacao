const Operador = require("../models/operador.model");
const bcrypt =require('bcryptjs')

class OperadorController {
  static async cadastrar(req, res) {
    try {
      const { nome, papel, email, senha } = req.body;
      if (!nome || !papel || !email || !senha) {
        return res
          .status(400)
          .json({ msg: "Todos os campos devem serem preenchidos!" });
      }
      // criptografando a senha
      const senhaCriptografada = await bcrypt.hash(senha, 15);
      await Operador.create({ nome, papel, email, senha: senhaCriptografada });
      res.status(200).json({ msg: 'Operador criado com sucesso' });
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message})
    }
  }
  static async perfil(req, res) {
    try {
      const { email } = req.operador; // vindo do token

      // Busca mais dados se necessário
      const operador = await Operador.findOne({
        where: { email },
        attributes: ['nome', 'email'], // apenas os campos públicos
      });

      if (!operador) {
        return res.status(404).json({ msg: "Operador não encontrado." });
      }

      res.status(200).json({ perfil: operador });
    } catch (error) {
      res.status(500).json({
        msg: "Erro ao buscar perfil.",
        erro: error.message
      });
    }
  }
}

module.exports = OperadorController