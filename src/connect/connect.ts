import mongoose, { ConnectionOptions } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
};

mongoose.connect(`${process.env.DB_CONNECTION}`, dbOptions);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mongodb conect");
});

connection.on("warning", (e:any) => console.warn(e.stack));