const express = require('express')
const transactionRouter = express.Router()
const transactionController = require('../controller/transaction_controller')
// // validation
const multer = require('multer');
// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './app/uploads'); // Set the destination for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname); // Set the filename
    },
});
const upload = multer({ storage });


// Account Statement File upload
transactionRouter.post('/create-transaction', upload.single('file'), transactionController.CreateTransaction)

module.exports = transactionRouter