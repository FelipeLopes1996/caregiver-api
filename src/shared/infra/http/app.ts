import express, { NextFunction, Request, Response } from "express";
import "express-async-error";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";
import "@shared/infra/typeorm";
import "@shared/container";
import AppError from "../../errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.log(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});
