const express = require("express");
const pool = require("./db_connect");

const router = express.Router();

router.get("/list", (req, res) => {});

router.post("/create", (req, res) => {});

//Patch username
router.patch("/modifyUsername/:id", (req, res) => {});

//Delete password
router.delete("/deletePassword", (req, res) => {});

//Modify password
router.patch("/madifyPassword/:id", (req, res) => {});
