const VagaEstacionamento = require('../../vaga/models/vaga.model');

class VagaEstacionamentoController {
  static async criar(req, res) {
    try {
      const { vaga_numero, ocupado, veiculo_placa, horario_entrada, horario_saida } = req.body;
      if (vaga_numero !== undefined && ocupado !== undefined) {
        const vaga = await VagaEstacionamento.create({
          vaga_numero,
          ocupado,
          veiculo_placa,
          horario_entrada,
          horario_saida
        });
        res.status(201).json({ mensagem: 'Vaga cadastrada com sucesso', vaga });
      } else {
        res.status(400).json({ mensagem: 'vaga_numero e ocupado são obrigatórios' });
      }
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const vagas = await VagaEstacionamento.findAll();
      if (vagas.length > 0) {
        return res.status(200).json(vagas);
      }
      res.status(200).json({ mensagem: 'Nenhuma vaga encontrada' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const vaga = await VagaEstacionamento.findByPk(id);
      if (vaga) {
        return res.status(200).json(vaga);
      }
      res.status(404).json({ mensagem: 'Vaga não encontrada' });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { vaga_numero, ocupado, veiculo_placa, horario_entrada, horario_saida } = req.body;
      if (vaga_numero !== undefined && ocupado !== undefined) {
        const [updated] = await VagaEstacionamento.update(
          { vaga_numero, ocupado, veiculo_placa, horario_entrada, horario_saida },
          { where: { id } }
        );
        if (updated) {
          const vagaAtualizada = await VagaEstacionamento.findByPk(id);
          res.status(200).json({ mensagem: 'Vaga atualizada com sucesso', vaga: vagaAtualizada });
        } else {
          res.status(404).json({ mensagem: 'Vaga não encontrada' });
        }
      } else {
        res.status(400).json({ mensagem: 'vaga_numero e ocupado são obrigatórios' });
      }
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const vaga = await VagaEstacionamento.findByPk(id);

      if (!vaga) {
        return res.status(404).json({ mensagem: 'Vaga não encontrada.' });
      }

      await vaga.destroy();
      res.status(200).json({ mensagem: 'Registro deletado com sucesso!' });

    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = VagaEstacionamentoController;