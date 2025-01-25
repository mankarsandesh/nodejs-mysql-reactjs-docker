const DataTypes = require('sequelize')
const db = require('../db/config')
const Users = require('./users');
const Category = require('./category');
const AccountFile = require('./account_file');

const Transaction = db.define(
    'transaction',
    {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('credit', 'debit'),
            allowNull: false,
        },
        amount: {
            type : DataTypes.INTEGER(10),
            allowNull: false,
        },
        balance: {
            type : DataTypes.INTEGER(10),
            allowNull: false,
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
        deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
    },
    {
        freezeTableName: true,
        tableName: 'transaction'
    }
)


// Define the relationship
Category.hasMany(Transaction);

module.exports = Transaction
