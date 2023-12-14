const User = require("../model/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Helper } = require("../components/helper");
exports.fetchAllUsers = async (req, res) => {
  // const users = await User.find()
  const users = await User.find({}).select("fullName userName");
  res.status(200).json({ users });
};

exports.getUserById = async (req, res) => {
  const userId = req.params.pid;
  const user = await User.findById(userId);
  res.json({ user });
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.pid;
  const user = await User.findOneAndDelete(userId);
  res.status(200).json({ message: "item is deleted!" });
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.pid;
  const updatedData = {
    fullName: req.body.fullName,
    userName: req.body.userName,
    password: req.body.password,
  };
  console.log("updatedData", updatedData);

  if (!updatedData.fullName && !updatedData.userName && !updatedData.password) {
    return res.status(400).json({ message: "There is no data to update" });
  }

  if (updatedData.userName) {
    const validUser = await User.findOne({ userName: updatedData.userName });
    if (validUser) {
      return res.status(400).json({ message: "UserName exit" });
    }
  }

  if (updatedData.password) {
    const hashedPass = await Helper.Hash(updatedData.password);
    updatedData.password = hashedPass;
  }

  const user = await User.findByIdAndUpdate(userId, updatedData);
  delete user["_doc"]["password"];
  res.status(200).json({ user });
};

exports.signup = async (req, res) => {
  const { userName, password, fullName } = req.body;
  const hashedPass = await Helper.Hash(password);

  if (userName) {
    const validUser = await User.findOne({ userName: userName });
    if (validUser) {
      return res.status(400).json({ message: "UserName exit" });
    }
  }
  const user = new User({
    userName,
    password: hashedPass,
    fullName,
    LastLogin: Date.now(),
  });
  const token = await Helper.GenerateToken(user);
  user.token = token;
  await user.save();
  delete user["_doc"]["password"];
  res.status(201).json({ user });
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  const validUser = await User.findOne({ userName: userName });
  if (!validUser) {
    return res.status(400).json({ message: "Invalid UserName" });
  }
  const validPassword = await Helper.Compare(password, validUser.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid Password" });
  }
  const token = await Helper.GenerateToken(validUser);
  const user = await User.findOneAndUpdate(
    { userName: validUser.userName },
    { lastLogin: Date.now() },
    { token }
  );
  delete user["_doc"]["password"];
  res.status(200).json({ user });
};
