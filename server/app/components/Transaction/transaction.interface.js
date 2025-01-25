const transactionModel = require('../../models/transaction')
// Find all Users

// Add New user
const storeTransaction = async (data, res) => {
    try {
        // console.log(data)
        const dataNew = await transactionModel.bulkCreate(data, { raw: true })
        console.log('pass')
        console.log(dataNew)
        return dataNew;
    } catch (error) {
        console.log('eerro')
        console.log(error)
        throw new Error(error.message)
    }
}
// Delete Uers
const deleteUser = async (userID, res) => {
    try {
        const deleted = await usersModel.destroy({ where: { userID: userID } })
        if (deleted == 1) {
            // If the category is deleted
            return 'Sucessfully Users Deleted'
        } else {
            return 'userID not found'
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
// Edit Users
const editUser = async (data, res) => {
    try {
        const userCheck = await usersModel.findOne({
            where: { userID: data.userID },
        })
        if (!userCheck) {
            return 'userID not found'
        }
        // If the City is deleted
        const updated = await usersModel.update(data, {
            where: { userID: data.userID },
        })
        return 'Successfully Users Updated'
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}
// Find User
const findUser = async (data, res) => {
    try {
        const count = await usersModel.findOne({
            where: { userEmail: data.userEmail },
        })
        if (count === null) {
            return false
        }
        return true
    } catch (error) {
        throw new Error(error.message)
    }
}
// Find User Data
const findUserData = async (data, res) => {
    try {
        const count = await usersModel.scope('withPassword').findOne({
            where: { userEmail: data.userEmail },
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
    storeTransaction,
    deleteUser,
    editUser,
    findUser,
    findUserData,
}
