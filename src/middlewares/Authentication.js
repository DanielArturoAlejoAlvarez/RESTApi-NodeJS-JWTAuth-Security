import config from "../config/config";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log(token);

    if (!token) {
      return res.status(403).json({ msg: "Token not provided!" });
    }

    const decoded = jwt.verify(token, config.secret_key);
    console.log(decoded);

    req.idUser = decoded.id;

    const user = await User.findById(req.idUser, { password: 0 });
    if (!user) return res.status(404).json({ msg: "User not found!" });
    console.log(user);

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized!" });
  }
};

export const isSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.idUser);

    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "SUPERADMIN") {
        next();
        return;
      }
    }
    return res.status(403).json({ msg: "Required SUPERADMIN Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};


