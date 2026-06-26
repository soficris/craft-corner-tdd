import Tutorial from '../tutorial/TutorialModel';

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Favorite = sequelize.define("Favorite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 

  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: {
      model: 'User', 
      key: 'id'
    }
  }, 

  tutorialId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tutorial, 
      key: 'id'
    }
  } 
  
});

export default Favorite;