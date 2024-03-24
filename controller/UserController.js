const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  try {
    let { name, email } = req.query;
    let queries = {};
    if (name) {
      queries.name = name;
    }
    if (email) {
      queries.email = email;
    }
    const response = await UserModel.find(queries);
    return res.status(200).json({
      status: "success",
      message: "user listed",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};
const getUserDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await UserModel.findById(userId);
    return res.status(200).json({
      status: "success",
      message: "user detail",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

const loginUser = async (req, res) => {
  const reqData = req.body;
  console.log(reqData, "reqData");
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign(
      { _id: user?._id, email: user?.email, password: password },
      SECRET_KEY
    );
    user.token = token;
    return res.status(200).json({
      status: "success",
      message: "login successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: err.message },
    });
  }
};

const createUser = async (req, res) => {
  const reqData = req.body;
  console.log(reqData, "reqData");
  try {
    const bcryptPassword = await bcrypt.hash(reqData?.password, 10);
    const newUser = new UserModel({ ...reqData, password: bcryptPassword });
    const response = await newUser.save();
    const token = jwt.sign(
      {
        _id: response?._id,
        email: response?.email,
        password: reqData?.password,
      },
      SECRET_KEY
    );
    response.token = token;
    return res.status(201).json({
      status: "success",
      message: "user created",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

const updateUser = async (req, res) => {
  // update a new user
  try {
    const reqData = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "UserId  are required" });
    }
    console.log("reqBody=>", req.body);
    const newUser = new UserModel(reqData);
    const response = await UserModel.updateOne({ _id: id }, reqData);
    return res.status(200).json({
      status: "success",
      message: "user updated",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

const updateUserSegment = async (req, res) => {
  try {
    const reqData = req.body;
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "UserId  are required" });
    }
    const response = await User.findByIdAndUpdate(userId, reqData);
    return res
      .status(200)
      .json({ status: "success", message: "user updated", data: response });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await UserModel.deleteOne({ _id: userId });
    return res.status(200).json({
      status: "success",
      message: "user deleted",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
      result: { error: error.message },
    });
  }
};

module.exports = {
  getAllUser,
  getUserDetail,
  createUser,
  updateUser,
  updateUserSegment,
  deleteUser,
  loginUser,
};
