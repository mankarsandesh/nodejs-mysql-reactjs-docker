const DataTypes = require('sequelize')
const db = require('../db/config')
const Users = require('./users')
const Banks = require('./banks')
const Transactions = require('./transaction')

const AccountFile = db.define(
    'account_file',
    {
        id: {
            type: DataTypes.BIGINT(20).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        account_type: {
            type: DataTypes.BIGINT(20).UNSIGNED,
        },
        file_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        file_url: {
            type : DataTypes.STRING(100),
            allowNull: true,
        },
        status: {
            type : DataTypes.STRING(10),
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
    },
    {
        freezeTableName: true,
        tableName: 'account_file'
    }
)

Users.hasMany(AccountFile)
Banks.hasMany(AccountFile)
Transactions.belongsTo(AccountFile)

module.exports = AccountFile
