import Role from "../models/Role";
import User from "../models/User";


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
  
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.idUser);
  
      const roles = await Role.find({ _id: { $in: user.roles } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ADMIN") {
          next();
          return;
        }
      }
      return res.status(403).json({ msg: "Required ADMIN Role!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error });
    }
  };