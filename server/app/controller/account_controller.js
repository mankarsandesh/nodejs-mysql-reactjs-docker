const {
    findCategoryData,
    storeAccount,
    deleteAccount,
    editAccount,
} = require('../components/Account/account.interface')

const { successResponse, serverError, badRequestError } = require('../utils/utils')

// fetch all currency
const getAllAccount = async (req, res) => {
    try {
        const account = await findCategoryData()
        return res.send(successResponse(account))
    } catch (error) {
        console.log(error)
        res.status(500).send(serverError())
    }
}

// Store Account  Information
const accountStore = async (req, res) => {
    try {
        const userBody = {
            account_name : req.body.account_name,
            account_description : req.body.account_description,
            user_id : 123,
            account_type : 'Saving',
            color : 'green'
        }
        const account = await storeAccount(userBody)
        if (account.error) {
            return res.status(400).send(badRequestError(account.error))
        }
        return res.send(successResponse(account))
    } catch (error) {
        res.status(500).send(serverError())
    }
}
// Edit Account
const accountEdit = async (req, res) => {
    try {
        const userBody = req.body
        const account = await editAccount(userBody)
        if (account.error) {
            return res.status(400).send(badRequestError(account.error))
        }
        return res.send(successResponse(account))
    } catch (error) {
        console.log(error)
        res.status(500).send(serverError())
    }
}
// Delete Account
const accountDelete = async (req, res) => {
    try {
        const accountID = req.body.accountID
        const account = await deleteAccount(accountID)
        if (account.error) {
            return res.status(400).send(badRequestError(account.error))
        }
        return res.send(successResponse(account))
    } catch (error) {
        console.log(error)
        res.status(500).send(serverError())
    }
}

module.exports = {
    getAllAccount,
    accountStore,
    accountDelete,
    accountEdit,
}
