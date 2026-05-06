const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Tutorial = sequelize.define("Tutorial", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: DataTypes.TEXT,
  materiais: DataTypes.TEXT, // pode salvar JSON string

  nivel: {
    type: DataTypes.ENUM("Iniciante", "Médio", "Avançado")
  },

  videoUrl: DataTypes.STRING,
  duracao: DataTypes.INTEGER,
  imagemCapa: DataTypes.STRING,

  status: {
    type: DataTypes.ENUM("rascunho", "revisao", "publicado"),
    defaultValue: "rascunho"
  }
});

export default Tutorial;