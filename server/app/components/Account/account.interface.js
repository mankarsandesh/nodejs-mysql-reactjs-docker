const accountModel = require('../../models/account')
// Find all Accounts

// Add New Account
const storeAccount = async (data, res) => {
    try {
        // console.log(data)
        const dataNew = await accountModel.bulkCreate(data, { raw: true })
        return dataNew;
    } catch (error) {
        console.log(error)
        // throw new Error(error.message)
    }
}
// Delete Account
const deleteAccount = async (AccountID, res) => {
    try {
        const deleted = await accountModel.destroy({ where: { AccountID: AccountID } })
        if (deleted == 1) {
            // If the category is deleted
            return 'Sucessfully Accounts Deleted'
        } else {
            return 'AccountID not found'
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
// Edit Account
const editAccount = async (data, res) => {
    try {
        const AccountCheck = await accountModel.findOne({
            where: { AccountID: data.AccountID },
        })
        if (!AccountCheck) {
            return 'AccountID not found'
        }
        // If the City is deleted
        const updated = await AccountsModel.update(data, {
            where: { AccountID: data.AccountID },
        })
        return 'Successfully Accounts Updated'
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
// Find Account
const findAccount = async (data, res) => {
    try {
        const count = await accountModel.findOne({
            where: { AccountEmail: data.AccountEmail },
        })
        if (count === null) {
            return false
        }
        return true
    } catch (error) {
        throw new Error(error.message)
    }
}
// Find Account Data
const findAccountData = async (data, res) => {
    try {
        const count = await accountModel.scope('withPassword').findOne({
            where: { AccountEmail: data.AccountEmail },
        })

        if (count === null) {
            return false
        }
        return count
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    storeAccount,
    deleteAccount,
    editAccount,
    findAccount,
    findAccountData,
}
