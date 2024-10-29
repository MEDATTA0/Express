import express from "express";
import { checkId } from "../middlewares/usersMiddlewares.js";
import todoRoutes from "./todosRoutes.js";

const userRoutes = express.Router();
userRoutes.use(express.json());
userRoutes.use(express.urlencoded({ extended: true }));

//Getting all users
//NB: Only for administrators
userRoutes.get("/", async (req, res) => {});

//Getting user information
userRoutes.get("/:userId", async (req, res) => {});

//creating user
userRoutes.post("/", async (req, res) => {});

//Patch username
userRoutes.patch("/:userId/username", async (req, res) => {});

//Delete password
userRoutes.delete("/:userId/password", (req, res) => {});

//Modify password
userRoutes.patch("/:userId/password", async (req, res) => {});

userRoutes.post("/:userId/reset", async (req, res) => {});

//The route for todos operations of a user
userRoutes.use("/:userId/todos", checkId, todoRoutes);

export default userRoutes;
