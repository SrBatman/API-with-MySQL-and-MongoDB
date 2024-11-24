const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Subcategory = sequelize.define(
    'Subcategory',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: 'subcategories', // Nombre exacto de la tabla
        timestamps: true, // Activa manejo de `createdAt` y `updatedAt`
    }
);

exports.Subcategories = Subcategory;