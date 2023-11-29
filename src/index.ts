import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
dotenv.config();

import { connectToDatabase } from "./db";
import authRouter from './routes/authRoutes'

const PORT = process.env.PORT;

const main = () => {
  const app = express();

  app.listen(PORT, () => {
    console.log(`App Started at Port: ${PORT}.`);
  });

  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("dev"));

  app.use('/auth', authRouter)

  connectToDatabase();
};

main();
