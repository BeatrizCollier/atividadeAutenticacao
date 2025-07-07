const jwt = require("jsonwebtoken");  //criar e validar tokens JWT
const bcrypt = require("bcryptjs");   //comparar senhas criptografadas
const dotenv = require("dotenv");
dotenv.config();
const Usuario = require("../../usuario/models/usuario.model"); 

// Definindo variaveis de ambiente para TEMPO_ACESS_TOKEN e TEMPO_REFRESH_TOKEN
const tempo_acess_token = process.env.TEMPO_ACESS_TOKEN;
const tempo_refresh_token = process.env.TEMPO_REFRESH_TOKEN;

class AutenticacaoController {
  // gerando o token - Cria um token de acesso usando os dados do usuário
  static gerarTokenAcesso(dadosUsuario) {
    return jwt.sign(dadosUsuario, process.env.SECRET_KEY, {    //usa a chave secreta da aplicação
      expiresIn: tempo_acess_token,   //Define o tempo de acesso de expiração
    }); 
  }
  // refress token - renovar o acesso
  static gerarRefressToken(dadosUsuario) {
    return jwt.sign(dadosUsuario, process.env.SECRET_KEY, {
      expiresIn: tempo_refresh_token,
    });
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;  //recebe email e senha do corpo da requisição
      if (!email || !senha) {
        return res
          .status(400)
          .json({ msg: "É necessario informar email e senha para login" });
      }
      const usuario = await Usuario.findOne({     //Busca o usuário pelo email no banco de dados
        where: { email },  
      });
      if (!usuario) {
        return res.status(401).json({ msg: "Usuario não encontrado!" });
      }
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);  // Compara a senha informada com a senha salva no banco (criptografada)
      if (!senhaCorreta) {
        return res.status(400).json({ msg: "E-mail ou senha incorreto!" });
      }
      const dadosUsuario = {           //Retorna o token de acesso, nome e papel do usuário
        nome: usuario.nome,
        email: usuario.email,
        papel: "usuario",
      };

      // gerando os tokens
      const tokenAcesso = AutenticacaoController.gerarTokenAcesso(dadosUsuario);
      const refreshToken = AutenticacaoController.gerarRefressToken(dadosUsuario);

      res.cookie("refreshToken", refreshToken, {    //Busca o refreshToken nos cookies
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameStrict: "strict",
        maxAge: 1 * 24, // 1 dia
      });
      res.status(200).json({
        msg: "Usuario logado com sucesso",
        tokenAcesso,
        nome: usuario.nome,
        papel: "usuario",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno do servidor. Por favor tente mais tarde.",
        erro: error.message,
      });
    }
  }
  // Método para renovar o refresh token
  static refreshToken(req, res) {
    // busca o refreshToken na req
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(403).json({ msg: "Refresh token invalido!" });
    }
    //Verifica se o refreshToken é válido usando a chave secreta de refresh
    jwt.verify(
      refreshToken,    //o token que veio do cookie
      process.env.JWT_REFRESH_SECRET,  //chave secreta específica para refresh token
      (erro, usuario) => {
        if (erro) {
          return res.status(403).json({ msg: "Refresh Token invalido!" });
        }
        const dadosUsuario = {  //Se o token for válido, pega os dados do usuário do próprio token
          nome: usuario.nome,
          email: usuario.email, 
          papel: "usuario",
        };

        // gerando o novo token
        const novoTokenAcesso = this.gerarTokenAcesso(dadosUsuario);
        // atualizando o token antigo para o novo
        res.status(200).json({ tokenAcesso: novoTokenAcesso });
      }
    );
  }
  static async sair(req, res) {
    try {
      res.clearCookie("refreshToken", {   //Limpa o cookie do refreshToken (logout)
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
      });
      res.status(200).json({ msg: "Logout realizado com sucesso" });
    } catch (error) {
      res.status(500).json({
        msg: "Erro interno do servidor. Por favor, tente mais tarde.",
        erro: error.message,
      });
    }
  }
}

module.exports = AutenticacaoController;