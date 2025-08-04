const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/configDB");

const VagaEstacionamento = sequelize.define(
  "Vaga",
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
      unique: true, 
      validate: {
        min: 1,
      },
    },
    ocupado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    veiculoId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Nulo se vaga estiver livre
      references: {
        model: "veiculo", //tabela de veículo
        key: "id",
      },
      onUpdate:"CASCADE"
    },
    horario_entrada: {
      type: DataTypes.TIME,
      allowNull: true,
      
    },
    horario_saida: {
      type: DataTypes.TIME,
      allowNull: true,
      validate: {
        isAfterEntrada(value) {
          if (value && this.horario_entrada && value < this.horario_entrada) {
            throw new Error("A saída deve ser após a entrada.");
          }
        },
      },
    },
  },
  {
    tableName: "vaga",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = VagaEstacionamento;