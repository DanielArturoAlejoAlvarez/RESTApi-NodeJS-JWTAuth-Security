import { keyENV as config } from "./config/config";
import mongoose from "mongoose";

mongoose
  .connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log("DB is connect!"))
  .catch((err) => console.log(err));
