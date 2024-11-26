const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Category = sequelize.define(
    'Category',
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
        tableName: 'categories', // Nombre exacto de la tabla
        timestamps: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

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
                model: Category,
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


Category.hasMany(Subcategory, { foreignKey: 'category_id', as: 'subcategories' });
Subcategory.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
exports.Categories = Category;
exports.Subcategories = Subcategory;