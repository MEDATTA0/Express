const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../db/db_connect");

const router = express.Router();
router.use(bodyParser.json());

//Getting all users
//NB: Only for administrators
router.get("/", async (req, res) => {
  let db_conn;
  try {
    db_conn = await pool.getConnection();
    const sqlQuery = "SELECT * FROM users";
    const result = await db_conn.execute(sqlQuery);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "Error while fetching ",
    });
  } finally {
    if (db_conn) db_conn.release();
  }
});

//Getting user information
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  let db_conn;
  try {
    db_conn = await pool.getConnection();
    const sqlQuery = "SELECT * FROM users where userId=?";
    const result = await db_conn.execute(sqlQuery, [userId]);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "Error while fetching ",
    });
    console.log("Error : ", err);
  } finally {
    if (db_conn) db_conn.release();
  }
});

//creating user
router.post("/", async (req, res) => {
  const { first_name, last_name, username, password, phone_number } = req.body;

  //We verify if something is null or not defined
  if (
    !first_name ||
    !last_name ||
    !username ||
    !password ||
    phone_number == null
  ) {
    return res.status(400).json({ error: "Please fill fields" });
  }

  let db_conn;
  try {
    db_conn = await pool.getConnection();
    const sqlQuery =
      "INSERT INTO users (first_name, last_name, username, password, phone_number) VALUES ('?', '?', '?', '?', ?)";
    const result = await db_conn.execute(sqlQuery, [
      first_name,
      last_name,
      username,
      password,
      phone_number,
    ]);
  } catch (err) {
    res.send(500).json({
      error: "Error while creating new user !",
    });
    console.log("Error : ", err);
  } finally {
    if (db_conn) db_conn.release();
  }
});

//Patch username
router.patch("/:userId/username", async (req, res) => {
  const userId = req.params.userId;
  const username = req.body;
  if (!username || username.length < 4) {
    res.status(400).json({
      error: "Please enter a username with at least 4 characters",
    });

    let db_conn;
    try {
      db_conn = await pool.getConnection();
      const sqlQuery = "UPDATE TABLE users SET username='?' WHERE id=? ";
      const result = await db_conn.execute(sqlQuery, [username, userId]);
      res.json({
        message: "Username updated successfully !",
      });
      console.log("Username updated successfully !");
    } catch (err) {
      res.status(500).json({
        error:
          "Error while updating username! Please Try later or the username already exists",
      });
    } finally {
      //On relache la connexion dans le pool, ainsi elle pourra être utilisée ailleurs
      //Contrairement à db_conn.end() qui ferme complètement tout le pool
      if (db_conn) db_conn.release();
    }
  }
});

//Delete password
router.delete("/:userId/password", (req, res) => {});

//Modify password
router.patch("/:userId/password", async (req, res) => {
  const userId = req.params.userId;
  const password = req.body;
  if (!password || password.length < 8) {
    res.status(400).json({
      error: "Please enter a password with at least 8 characters",
    });

    let db_conn;
    try {
      db_conn = await pool.getConnection();
      const sqlQuery = "UPDATE TABLE users SET password='?' WHERE id=? ";
      const result = await db_conn.execute(sqlQuery, [password, userId]);
      res.json({
        message: "Password updated successfully !",
      });
      console.log("Password updated successfully !");
    } catch (err) {
      res.status(500).json({
        error: "Error while updating password ! Please Try later",
      });
    } finally {
      //On relache la connexion dans le pool, ainsi elle pourra être utilisée ailleurs
      //Contrairement à db_conn.end() qui ferme complètement tout le pool
      if (db_conn) db_conn.release();
    }
  }
});

//The route for todos operations of a user
const todoRoutes = require("./todosRoutes");
router.use("/:userId/todos", todoRoutes);

module.exports = router;
