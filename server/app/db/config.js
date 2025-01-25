const {Sequelize} = require('sequelize')
const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD,
	{
		host: process.env.MYSQL_HOST_IP,
		dialect: 'mysql',
		dialectOptions: {
			//useUTC: false,
			dateStrings: true,
			typeCast: function (field, next) {
				// for reading from database
				if (field.type === 'DATETIME') {
					return field.string()
				}
				return next()
			},
		},
		timezone: '+07:00',
	}
)


//Check if the database is connected successfully
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection established successfully')
	})
	.catch((error) => {
		console.log(error)
	})

// const db = {};
// db.Sequelize = Sequelize
// db.sequelize = sequelize

// db.accountType = require('../models/account_type')(Sequelize,DataTypes)
// Create db table if it does not exist
sequelize.sync()
// Force sync all models
// It will drop the table first
// and re-create it afterwards
// sequelize.sync({force:true})

module.exports = sequelize
