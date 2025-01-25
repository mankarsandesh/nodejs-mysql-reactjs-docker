const categoryModel = require("../../models/category");
// Find all Category

// Add New user
const storeCategory = async (data, res) => {
  try {
    const Category = await categoryModel.create(data, { raw: true });
    return Category;
  } catch (error) {
    console.log(error);
  }
};
// Delete Uers
const deleteUser = async (userID, res) => {
  try {
    const deleted = await categoryModel.destroy({ where: { userID: userID } });
    if (deleted == 1) {
      // If the category is deleted
      return "Sucessfully Category Deleted";
    } else {
      return "userID not found";
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
// Edit Category
const editCategory = async (data, res) => {
  try {
    const userCheck = await categoryModel.findOne({
      where: { id: data.id },
    });
    if (!userCheck) {
      return "Category ID not found";
    }
    // If the City is deleted
    const updated = await categoryModel.update(data, {
      where: { id: data.id },
    });
    return "Successfully Category Updated";
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
// Find User
const findCategory = async ({ id }, res) => {
  try {
    const data = await categoryModel.findOne({
      where: { id: id },
    });
    if (data === null) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Find User Data
const findCategoryData = async (data, res) => {
  try {
    const count = await categoryModel.findAll();

    if (count === null) {
      return false;
    }
    return count;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  storeCategory,
  deleteUser,
  editCategory,
  findCategory,
  findCategoryData,
};
