const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db/db_connect");

const router = express.Router();
router.use(bodyParser.json());

//Getting all users
//NB: Only for administrators
router.get("/", async (req, res) => {});

//Getting user information
router.get("/:userId", async (req, res) => {});

//creating user
router.post("/", async (req, res) => {});

//Patch username
router.patch("/:userId/username", async (req, res) => {});

//Delete password
router.delete("/:userId/password", (req, res) => {});

//Modify password
router.patch("/:userId/password", async (req, res) => {});

//The route for todos operations of a user
const todoRoutes = require("./todosRoutes");
router.use("/:userId/todos", todoRoutes);

module.exports = router;
