const { DataTypes } = require("sequelize");
const { sequelize } = require("../../../config/configDB");

const Operador = sequelize.define(
  "Operador",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    papel: {
      type: DataTypes.ENUM('operador', 'cliente'),
      allowNull: false,
      validate:{
        isIn:{
          args:[["operador", "cliente"]],
          msg:"O papel deve ser operador."
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Email inválido" },
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validade: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          msg: "A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.",
        },
      },
    },
  },
  {
    tableName: "operador",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

module.exports = Operador;
