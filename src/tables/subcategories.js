const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const { Categories } = require('./categories');

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
        category_id: {
            type: DataTypes.BIGINT.UNSIGNED, // bigint(20) unsigned
            allowNull: false,
            references: {
                model: Categories,
                key: 'id', 
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        },
    },
    {
        tableName: 'subcategories', // Nombre exacto de la tabla
        timestamps: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Subcategory.belongsTo(Categories, { foreignKey: 'category_id', as: 'category' });
exports.Subcategories = Subcategory;