import express from "express";
import {
  getAllTodos,
  getTodos,
  createTodo,
} from "../controllers/todosController.js";

const todoRoutes = express.Router();
todoRoutes.use(express.json());
todoRoutes.use(express.urlencoded({ extended: true }));

//Getting all tasks
//allTodos va différencier les todos d'un utilisateur des todos de tous utilisateurs qui est réservé aux administrateurs
todoRoutes.get("/allTodos", async (req, res, next) => {
  const userId = req.params.userId
    (Number.parseInt(userId)) ? next() : res.status(400).json({ message: "BAD USER ID" })
}, getAllTodos);

//Getting user's todos
todoRoutes.get("/", async (req, res, next) => {
  const userId = req.params.userId;
  (Number.parseInt(userId)) ? next() : res.status(400).json({ message: "BAD USER ID" })
}, getTodos);

//Creating new task
todoRoutes.post("/", async (req, res, next) => {
  const userId = req.params.userId;
  const { title, task_description, isCompleted } = req.body;
  // Checking if variables are falsy or null
  if (!Number.parseInt(userId) || !title || !task_description || typeof isCompleted === "undefined") {
    res.status(400).json({ error: "Please fill fields" });
  } else {
    next()
  }
}, createTodo);

//Updating task
todoRoutes.patch("/:taskId", async (req, res) => { });

//Deleting task
todoRoutes.delete("/:taskId", async (req, res) => { });

export default todoRoutes;
