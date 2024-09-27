const connection = require('../database/connection');
const { DataTypes } = require('sequelize');
const UserModel = require('./UserModel');

const Link = connection.define("links", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    },
    label: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'links',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Link;
