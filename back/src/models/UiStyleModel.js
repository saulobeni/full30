const connection = require('../database/connection');
const { DataTypes } = require('sequelize');
const UserModel = require('./UserModel');

const UiStyle = connection.define("ui_style", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
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
});

module.exports = UiStyle;