const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Brands = sequelize.define(
    'Brand',
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
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'brands', 
        timestamps: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

exports.Brands = Brands;