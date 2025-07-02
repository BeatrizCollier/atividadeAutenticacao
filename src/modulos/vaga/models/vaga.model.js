const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/configDB");

const VagaEstacionamento = sequelize.define(
  "VagaEstacionamento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    vaga_numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    ocupado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    veiculo_placa: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: {
          args: /^[A-Z]{3}-\d{4}$/i,
          msg: "A placa deve estar no formato ABC-1234",
        },
      },
    },
    horario_entrada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    horario_saida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "vaga_estacionamento",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = VagaEstacionamento;