# RESTApi-NodeJS-JWTAuth-Security
## Description

Software of Development to Authentication of users with NodeJS, MongoDB, Bcrypt, JWT, Express, Mongoose, etc.

![alt text](https://miro.medium.com/max/1920/1*0ABaK4SrXGUnXgmXqMkZtA.png)

## Installation
Using Nodejs v16.2, Express, Mongoose preferably.

## DataBase
Using MongoDB preferably.

## Apps
Using Postman or RestEasy to feed the api.

## Usage
```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/RESTApi-NodeJS-JWTAuth-Security.git [NAME APP] 

$ npm install

$ npm run dev (development)

$ npm run build (production)
```
Follow the following steps and you're good to go! Important:

![alt text](https://miro.medium.com/max/601/1*tx_GMMffHZeBDr1RDnStlg.gif)

## Coding

### Controllers
```javascript
...
export const login = async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    }).populate("roles")

    if (!user) {
        return res.status(400).json({msg: 'User not found!'})
    }

    const matchPassword = await User.comparePassword(req.body.password, user.password)
    if (!matchPassword) {
        return res.status(401).json({token: null, msg: 'Password is invalid!'})
    }

    const token = jwt.sign({id: user._id}, config.secret_key, {
        expiresIn: 60 * 60
    })

    return res.status(200).json({
        msg: "User is loggedin!",
        token
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
```

### Models
```javascript
...
const userSchema = new Schema(
  {
    displayName: String,
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      maxLength: 512,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.statics.comparePassword = (password, receivePassword) => {
  return bcrypt.compare(password, receivePassword);
};

export default model("User", userSchema);
```

### Routers
```javascript
...
import {Router} from 'express'

const router = Router() 

import { getUsers, getUser, saveUser, updateUser, deleteUser } from '../controllers/user.controllers'
import { verifyToken } from '../middlewares/Authentication'
import { isSuperAdmin, isAdmin } from '../middlewares/PermissionsLevel'
import { checkRolesExists } from '../middlewares/CheckSignUp'

router.get('/', getUsers)
router.get('/:idUser', getUser)
router.post('/', [
    verifyToken,
    isSuperAdmin,
    isAdmin,
    checkRolesExists
], saveUser)
router.put('/:idUser', updateUser)
router.delete('/:idUser', deleteUser)

export default router
```

### Middlewares
```javascript
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

```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/RESTApi-NodeJS-JWTAuth-Security. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
