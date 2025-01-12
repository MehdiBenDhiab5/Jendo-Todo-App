import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import todoRouter from "./features/todo/todo.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
