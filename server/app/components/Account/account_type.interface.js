const accountTypeModel = require('../../models/account_type')


// Add New Account Type
const storeAccountType = async (data, res) => {
    try {
        // console.log(data)
        const dataAccountType = await accountTypeModel.bulkCreate(data, { raw: true })
        return dataAccountType;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

// Find Account Data
const findAccountTypeData = async (data, res) => {
    try {
        const count = await accountTypeModel.findOne({
            where: { name: data.name },
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
    storeAccountType,
    findAccountTypeData,
}
