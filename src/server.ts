import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
dotenv.config();

import { router } from "./routes";

const server = express();

//----middlewares------
server.set("view engine", "ejs");
server.set("views", "src/views");

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));

server.use(router);

server.listen(process.env.API_PORT, () => {
  console.log(
    `Server runing in ${process.env.API_HOST}:${process.env.API_PORT}`
  );
});
