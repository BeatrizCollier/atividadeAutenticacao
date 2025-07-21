const Veiculo = require('../../veiculo/models/veiculo.model');

class VeiculoController {
  static async criar(req, res) {
    try {
      const { placa, modelo, cor, proprietario_nome } = req.body;

      if (!placa || !modelo || !cor || !proprietario_nome) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
      }

      const veiculoExistente = await Veiculo.findOne({ where: { placa } });

      if (veiculoExistente) {
        return res.status(409).json({ mensagem: 'Veículo com essa placa já cadastrado.' });
      }

      const veiculo = await Veiculo.create({
        placa,
        modelo,
        cor,
        proprietario_nome
      });

      res.status(201).json({ mensagem: 'Veículo cadastrado com sucesso', veiculo });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const veiculos = await Veiculo.findAll();
      if (veiculos.length > 0) {
        return res.status(200).json(veiculos);
      }
      res.status(200).json({ mensagem: 'Nenhum veículo encontrado' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const veiculo = await Veiculo.findByPk(id);
      if (veiculo) {
        return res.status(200).json(veiculo);
      }
      res.status(404).json({ mensagem: 'Veículo não encontrado' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { placa, modelo, cor, proprietario_nome } = req.body;

      const veiculo = await Veiculo.findByPk(id);
      if (!veiculo) {
        return res.status(404).json({ mensagem: 'Veículo não encontrado' });
      }

      await veiculo.update({ placa, modelo, cor, proprietario_nome });

      res.status(200).json({ mensagem: 'Veículo atualizado com sucesso', veiculo });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const veiculo = await Veiculo.findByPk(id);

      if (!veiculo) {
        return res.status(404).json({ mensagem: 'Veículo não encontrado.' });
      }

      await veiculo.destroy();
      res.status(200).json({ mensagem: 'Veículo deletado com sucesso!' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = VeiculoController;
