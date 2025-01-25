const {
    storeTransaction
} = require('../components/Transaction/transaction.interface')
const moment = require('moment')
const XLSX = require('xlsx');
const {
    successResponse,
    badRequestError,
    serverError
} = require('../utils/utils')

// upload excel file
const isDateValid = (date) => {
    return !isNaN(new Date(date));
}
const CreateTransaction = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Read the uploaded file
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);

        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const data = [];
        sheetData.forEach((row) => {
            // transaction_date: moment(row.Date).format('YYYY-MM-DD'),
            const { date, narration, debit, credit, balance }  = row;
            console.log(row)
            let transactionData = {
                user_id: 123,
                account_id: 12,
                transaction_date: moment(date, 'mm/DD/YY').format('YYYY-MM-DD'),
                transaction_description: narration,
                transaction_type: debit ? 'debit' : 'credit',
                amount: debit ? debit : credit,
                balance: balance
            }
            console.log(transactionData)
            data.push(transactionData);
        })

        const transaction = await storeTransaction(data)
        if (transaction.error) {
            return res.status(400).send(badRequestError(transaction.error))
        }
        // Send the sheet data as response
        return res.send(successResponse(transaction))
        // res.json({
        //     message: 'File uploaded successfully!',
        //     data: successResponse(transaction),
        // });
    } catch (error) {
        console.log(error)
        return res.status(500).send(serverError())
    }
}



module.exports = {
    CreateTransaction
}
