import express from "express";
import {
  getAllTodos,
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../controllers/v2/todosControllers.js";

import {
  checkId,
  checkCreateParams,
  checkUpdateParams,
} from "../../middlewares/todosMiddlewares.js";

const todoRoutes = express.Router();

todoRoutes.use(express.json());
todoRoutes.use(express.urlencoded({ extended: true }));

todoRoutes.get("/allTodos", getAllTodos);
todoRoutes.get("/", getTodos);
todoRoutes.get("/:todoId", checkId, getTodo);
todoRoutes.post("/", checkCreateParams, createTodo);
todoRoutes.patch("/:todoId", checkUpdateParams, updateTodo);
todoRoutes.delete("/:todoId", checkId, deleteTodo);

export default todoRoutes;
