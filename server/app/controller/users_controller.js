const bcrypt = require("bcryptjs");
const {
  findUserData,
  findUser,
  storeUsers,
} = require("../components/Users/users.interface");
const {
  successResponse,
  serverError,
  notFoundError,
  badRequestError,
} = require("../utils/utils");
const jwt = require("jsonwebtoken");
const { validateUsers } = require("../middleware/validators/users");

// Users Login
const AuthUsers = async (req, res) => {
  try {
    const usersData = {
      email: req.body.email,
      password: req.body.password,
    };
    const userData = await findUserData(usersData);
    if (!userData) {
      return res
        .status(401)
        .send(notFoundError("Your email and password is incorrect"));
    } else if (!(usersData.password, userData.password)) {
      return res
        .status(401)
        .send(notFoundError("Your email and password is incorrect"));
    } else {
      const token = jwt.sign({ user: userData.userEmail }, "sandesh_AAWT_key");
      return res.send(
        successResponse({
          id: userData.id,
          full_name: userData.full_name,
          email: userData.email,
          user_type: userData.user_type,
          access_token: token,
        })
      );
    }
  } catch (error) {
    res.status(500).send(serverError());
  }
};

// Store users Information
const usersStore = async (req, res) => {
  try {
    const user = {
      full_name: req.body.full_name,
      user_email: req.body.user_email,
      user_type: req.body.user_type,
      password: req.body.password,
    };
    const response = validateUsers(user);
    if (response.error) {
      return res.status(400).json({ errors: response.error.details });
    }
    const salt = await bcrypt.genSaltSync(10);
    const usersData = {
      full_name: req.body.full_name,
      email: req.body.user_email,
      user_type: req.body.user_type,
      password: await bcrypt.hashSync(req.body.password, salt),
    };
    const userExists = await findUser({ email: usersData.email });
    if (userExists) {
      return res.status(404).send(notFoundError("Email Id Already Exits"));
    } else {
      const userStored = await storeUsers(usersData);
      if (userStored.error) {
        return res.status(400).send(badRequestError(userStored.error));
      }
      return res.send(successResponse(userStored));
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(serverError());
  }
};

module.exports = {
  AuthUsers,
  usersStore,
};
