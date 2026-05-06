const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { type } = require('happy-dom/lib/PropertySymbol');

const User = sequelize.define('User', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: { isEmail: true }
        }, 

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 

        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        }, 

        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, 
    {
         timestamps: true,
        tableName: 'users'

    }
); 

module.exports = User;