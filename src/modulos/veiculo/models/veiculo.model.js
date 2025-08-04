const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/configDB");

const Veiculo = sequelize.define(
  "Veiculo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [7, 10], // Ex: ABC1234 ou ABC-1234
      },
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    proprietario_nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "veiculo",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Veiculo;
