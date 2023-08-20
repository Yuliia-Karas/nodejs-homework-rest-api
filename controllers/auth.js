const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/users");
const { ctrlWrapper, HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    password: newUser.password,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(400, "Помилка від Joi або іншої бібліотеки валідації");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});

  res.json({
    message: "Logout success"
  });
};


const updateUserSubscription = async (req, res) => {
  const { subscription } = req.body; 
  const { id } = req.user; 
  try {
    if (["starter", "pro", "business"].includes(subscription)) {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { subscription },
        { new: true }
      );

      res.json(updatedUser);
    } else {
      res.status(400).json({ message: "Invalid subscription value" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating subscription", error: error.message });
  }
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
};
