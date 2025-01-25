const bcrypt = require("bcryptjs");
const {
  findCategoryData,
  findCategory,
  editCategory,
  storeCategory,
} = require("../components/Category/category.interface");
const {
  successResponse,
  serverError,
  notFoundError,
  badRequestError,
} = require("../utils/utils");
const jwt = require("jsonwebtoken");
const { validateCategory } = require("../middleware/validators/users");

// Users Login
// const AuthUsers = async (req, res) => {
//   try {
//     const usersData = {
//       email: req.body.email,
//       password: req.body.password,
//     };
//     const userData = await findUserData(usersData);
//     console.log(userData);
//     if (!userData) {
//       return res
//         .status(401)
//         .send(notFoundError("Your email and password is incorrect"));
//     } else if (!(usersData.password, userData.password)) {
//       return res
//         .status(401)
//         .send(notFoundError("Your email and password is incorrect"));
//     } else {
//       const token = jwt.sign({ user: userData.userEmail }, "sandesh_AAWT_key");
//       return res.send(
//         successResponse({
//           id: userData.id,
//           full_name: userData.full_name,
//           email: userData.email,
//           user_type: userData.user_type,
//           access_token: token,
//         })
//       );
//     }
//   } catch (error) {
//     res.status(500).send(serverError());
//   }
// };

// Store category Information
const categoryStore = async (req, res) => {
  try {
    const requestData = {
      name: req.body.name,
      keyword: req.body.keyword,
      icon: req.body.icon,
    };
    const response = validateCategory(requestData);
    if (response.error) {
      return res.status(400).json({ errors: response.error.details });
    }
    const categoryExists = await findUser({ name: requestData.name });
    if (categoryExists) {
      return res.status(404).send(notFoundError("Category name Already Exits"));
    } else {
      const categoryStored = await storeCategory(requestData);
      if (categoryStored.error) {
        return res.status(400).send(badRequestError(categoryStored.error));
      }
      return res.send(successResponse(categoryStored));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(serverError());
  }
};


// Store users Information
const categoryEdit = async (req, res) => {
  try {
    const requestData = {
      name: req.body.name,
      keyword: req.body.keyword,
      icon: req.body.icon,
      id: req.params.id
    };
    const response = validateCategory(requestData);
    console.log(response)
    if (response.error) {
      return res.status(400).json({ errors: response.error.details });
    }
    const categoryExists = await findCategory({ id: requestData.id });
    if (!categoryExists) {
      return res.status(404).send(notFoundError("Category name Already Exits"));
    } else {
      const categoryStored = await editCategory(requestData);
      if (categoryStored.error) {
        return res.status(400).send(badRequestError(categoryStored.error));
      }
      return res.send(successResponse(categoryStored));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(serverError());
  }
};

// fetch all currency
const getAllCategory = async (req, res) => {
  try {
      const account = await findCategoryData()
      return res.send(successResponse(account))
  } catch (error) {
      console.log(error)
      res.status(500).send(serverError())
  }
}

module.exports = {
  // AuthUsers,
  categoryStore,
  categoryEdit,
  getAllCategory
};
