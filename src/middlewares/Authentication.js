import { keyENV as config } from "../config/config";
import jwt from "jsonwebtoken";
import User from "../models/User";

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
