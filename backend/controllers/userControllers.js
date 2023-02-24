const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const jwt = require('jsonwebtoken');

//Description: get or Search all users
//GET /api/user?search=
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//Description: register new user
//POST /api/user/
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });


  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: jwt.sign(user._id, 'ncaoduc@tma.com.vn', {
        expiresIn: "30d",
      })
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//Description: auth the user
//POST /api/user/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const id = user._id;

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: jwt.sign({ id }, 'ncaoduc@tma.com.vn', {
        expiresIn: "30d",
      })
    });

  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//Description: register new user
//PUT /api/user/updateProfile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, pic, id, password } = req.body;
  const update = { name: name, email: email, pic: pic, password: password };

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  let updated = await User.findByIdAndUpdate(id, update, { new: true });
  await updated.save();

  const idUpdated = updated._id;

  if (updated) {
    res.status(201).json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      isAdmin: updated.isAdmin,
      pic: updated.pic,
      token: jwt.sign({ idUpdated }, 'ncaoduc@tma.com.vn', {
        expiresIn: "30d",
      })
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

module.exports = { allUsers, registerUser, authUser, updateProfile };
