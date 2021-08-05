import config from "../../config/config";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export const login = async (req, res) => {};

export const register = async (req, res) => {
  const { displayName, username, email, password, avatar, roles, status } =
    req.body;

  const newUser = new User({
    displayName,
    username,
    email,
    password: User.encryptPassword(password),
    avatar,
    roles,
    status,
  });

  const user = await newUser.save();

  const token = jwt.sign({ id: user._id }, config.secret_key, {
    expiresIn: 60 * 60,
  });

  return res.status(201).json({
    msg: "User is registered!",
    token,
    user,
  });
};
