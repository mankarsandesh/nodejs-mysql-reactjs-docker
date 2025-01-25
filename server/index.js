const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser')

const banks = require('./app/models/banks')
const account_file = require('./app/models/account_file')
const account = require('./app/models/account')
const category = require('./app/models/category')
const transaction = require('./app/models/transaction')
const users = require('./app/models/users')
// Connect DB
require('./app/db/config')


const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

banks.sync();
account_file.sync();
account.sync();
category.sync();
transaction.sync();
users.sync();


// Routers
// const userRoute = require('./app/routers/user_route')
// const categoryRoute = require('./app/routers/category_route')
// // const accountRoute = require('./app/routers/account_route')
// const transactionRouter = require('./app/routers/transaction_route')

// app.use(userRoute)
// app.use(categoryRoute)
// app.use(transactionRouter)
app.use(cors());


app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log(`AccountFlow server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
});
