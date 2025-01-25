const express = require('express')
const accountTypeRouter = express.Router()
const accountController = require('../controller/account_controller')


accountTypeRouter.get('/account-type', accountController.getAllAccount)



module.exports = accountTypeRouter