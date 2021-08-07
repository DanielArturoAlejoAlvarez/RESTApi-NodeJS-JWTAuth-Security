import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./libs/initSetup";

import productRouter from "./routes/product.routes";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";

const app = express();

createRoles();

app.set("pkg", pkg);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({
    name: app.get("pkg").name,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
    version: app.get("pkg").version,
    github: app.get("pkg").repository.url,
    msg: "WELCOME TO MY REST API",
  });
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/auth", authRouter);

export default app;