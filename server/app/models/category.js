const DataTypes = require('sequelize')
const db = require('../db/config')
const Users = require('./users')

const Category = db.define(
    'category',
    {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        keyword: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP()'),
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            timestamps: false,
            field: 'updated_at',
        },
    },
    {
        freezeTableName: true,
        tableName: 'category'
    }
)



module.exports = Category
