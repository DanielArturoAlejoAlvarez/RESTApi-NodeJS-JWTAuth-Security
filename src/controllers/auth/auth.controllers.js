import { keyENV as config } from "../../config/config";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import Role from "../../models/Role";

export const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  }).populate("roles");

  if (!user) {
    return res.status(400).json({ msg: "User not found!" });
  }

  const matchPassword = await User.comparePassword(
    req.body.password,
    user.password
  );
  if (!matchPassword) {
    return res.status(401).json({ token: null, msg: "Password is invalid!" });
  }

  const token = jwt.sign({ id: user._id }, config.secret_key, {
    expiresIn: 60 * 60,
  });

  return res.status(200).json({
    msg: "User is loggedin!",
    token,
  });
};

export const register = async (req, res) => {
  try {
    const { displayName, username, email, password, avatar, roles, status } =
      req.body;

    const newUser = new User({
      displayName,
      username,
      email,
      password: await User.encryptPassword(password),
      avatar,
      status,
    });

    //Get roles ids
    if (req.body.roles) {
      const arrayRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = arrayRoles.map((role) => role._id);
    } else {
      //Creating role by default
      const role = await Role.findOne({ name: "USER" });
      newUser.roles = [role._id];
    }

    console.log(newUser);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, config.secret_key, {
      expiresIn: 60 * 60,
    });

    return res.status(200).json({
      msg: "User is registered!",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
