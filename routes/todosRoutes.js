import express from "express";
import {
  checkCreateParams,
  checkId,
  checkUpdateParams,
} from "../middlewares/todosMiddlewares.js";
import {
  getAllTodos,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
} from "../controllers/todosController.js";

const todoRoutes = express.Router();
todoRoutes.use(express.json());
todoRoutes.use(express.urlencoded({ extended: true }));

//Getting all todos
todoRoutes.get("/allTodos", getAllTodos);

//Getting user's todos
todoRoutes.get("/", getTodos);

todoRoutes.get("/:todoId", checkId, getTodo);

//Creating new todo
todoRoutes.post("/", checkCreateParams, createTodo);

//Updating todo
todoRoutes.patch("/:todoId", checkUpdateParams, updateTodo);

//Deleting todo
todoRoutes.delete("/:todoId", checkId, deleteTodo);

export default todoRoutes;
