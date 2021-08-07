import { Router } from "express";

const router = Router();

import { login, register } from "../controllers/auth/auth.controllers";
import {
  checkEmailAndUsernameExists,
  checkRolesExists,
} from "../middlewares/CheckSignUp";

router.post("/login", login);
router.post(
  "/register",
  [checkRolesExists, checkEmailAndUsernameExists],
  register
);

export default router;
