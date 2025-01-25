const {
    storeAccountType,
    findAccountTypeData,
} = require('../components/Account/account_type.interface')

const { successResponse, serverError, badRequestError } = require('../utils/utils')

// fetch all currency
const getAllAccount = async (req, res) => {
    try {
        const account = await allAccount()
        return res.send(successResponse(account))
    } catch (error) {
        console.log(error)
        res.status(500).send(serverError())
    }
}

// Store Account  Information
const accountStore = async (req, res) => {
    try {
        const userBody = [{
            name : 'Saving'
        },{
            name : 'Current'
        },{
            name : 'Credit Card'
        }];
        const account = await storeAccountType(userBody)
        if (account.error) {
            return res.status(400).send(badRequestError(account.error))
        }
        return res.send(successResponse(account))
    } catch (error) {
        res.status(500).send(serverError())
    }
}

module.exports = {
    accountStore,
}
