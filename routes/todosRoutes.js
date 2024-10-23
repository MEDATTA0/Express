const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db/db_connect");

const router = express.Router();
router.use(bodyParser.json());

//Getting all tasks
router.get("/", async (req, res) => {});

//Creating new task
router.post("/", async (req, res) => {});

//Updating task
router.patch("/:taskId", async (req, res) => {});

//Deleting task
router.delete("/:taskId", async (req, res) => {});

module.exports = router;
