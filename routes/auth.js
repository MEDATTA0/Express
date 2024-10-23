const express = require("express");
const pool = require("../db/db_connect");

const router = express.Router();

router.post("/login", (req, res) => {});

router.get("/reset", (req, res) => {});

router.patch("/update", (req, res) => {});

router.post("/access", (req, res) => {});

module.exports = router;
