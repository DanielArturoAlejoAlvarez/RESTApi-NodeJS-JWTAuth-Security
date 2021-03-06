import User from "../models/User";

export const getUsers = async (req, res) => {
  const users = await User.find().populate("roles");
  return res.json(users);
};

export const getUser = async (req, res) => {
  const { idUser } = req.params;
  const user = await User.findById(idUser).populate("roles");
  return res.json(user);
};

export const saveUser = async (req, res) => {
  const { displayName, username, email, password, avatar, status } = req.body;
  const newUser = new User({
    displayName,
    username,
    email,
    password,
    avatar,
    status,
  });
  const user = await newUser.save();

  return res.status(201).json({
    msg: "User saved successfully!",
    user,
  });
};

export const updateUser = async (req, res) => {
  const { idUser } = req.params;

  const updUser = await User.findByIdAndUpdate(idUser, req.body, {
    new: true,
  });

  return res.status(201).json({
    user: updUser,
    msg: "User updated successfully!",
  });
};

export const deleteUser = async (req, res) => {
  const { idUser } = req.params;

  await User.findByIdAndDelete(idUser);
  return res.status(200).json({
    msg: "User deleted successfully!",
  });
};
