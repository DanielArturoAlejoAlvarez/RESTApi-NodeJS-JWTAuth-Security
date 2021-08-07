import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkEmailAndUsernameExists = async (req, res, next) => {
  const username = await User.findOne({ username: req.body.username });

  if (username) {
    return res.status(400).json({ msg: "Username already exist!" });
  }

  const email = await User.findOne({ email: req.body.email });

  if (email) {
    return res.status(400).json({ msg: "Email already exist!" });
  }

  next();
};

export const checkRolesExists = (req, res, next) => {
  const arrayRoles = req.body.roles;

  if (req.body.roles) {
    for (let i = 0; i < arrayRoles.length; i++) {
      if (!ROLES.includes(arrayRoles[i])) {
        return res.status(401).json({
          msg: `Role ${arrayRoles[i]} does not exixts!`,
        });
      }
    }
  }

  next();
};
