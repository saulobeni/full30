const connection = require('../database/connection');
const { DataTypes } = require('sequelize');
const UserModel = require('./UserModel');

const UiStyle = connection.define("ui_style", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Certifique-se de que o modelo de usuários esteja correto
            key: 'id'
        }
    },
    attribute: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    value: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    is_hover: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'ui_style',
    timestamps: true, // Isso habilita a criação automática de createdAt e updatedAt
    createdAt: 'created_at', // Mapeia o campo createdAt do Sequelize para created_at do banco
    updatedAt: 'updated_at'  // Mapeia o campo updatedAt do Sequelize para updated_at do banco
});


module.exports = UiStyle;