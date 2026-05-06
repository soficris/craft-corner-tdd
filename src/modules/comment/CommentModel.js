const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default Comment;