const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db_connect");

const router = express.Router();
router.use(bodyParser.json());

//Getting all tasks
router.get("/", async (req, res) => {
  const userId = req.params.userId;
  let db_conn;
  try {
    db_conn = await pool.getConnection();
    const sqlQuery = "SELECT * FROM tasks WHERE userId=? ";
    const rows = await db_conn.execute(sqlQuery, [userId]);
    if (rows === 0) res.json({ response: "Task empty !" });
  } catch (err) {
    res.status(500).json({ error: "Error while fetching server !" });
    console.log("Error : ", err);
  } finally {
    if (pool) db_conn.release();
  }
});

//Creating new task
router.post("/", async (req, res) => {
  const userId = req.params.userId;
  const { title, task_description, isCompleted } = req.body;

  // Vérification de la validité des données entrées par l'utilisateur
  if (!title || !task_description || typeof isCompleted === "undefined") {
    return res.status(400).json({ error: "Please fill fields." });
  }

  let db_conn;
  try {
    db_conn = await pool.getConnection();
    const sqlQuery = `INSERT INTO tasks (title, task_description, completed, userId) VALUES (?, ?, ?, ?)`;
    const result = db_conn_conn.execute(sqlQuery, [
      title,
      task_description,
      isCompleted,
      userId,
    ]);

    res.json({
      message: "Task added successfully",
      taskId: result.task_id,
    });
    console.log("Todo added successfully");
  } catch (err) {
    res.status(500).json({ error: "Server while adding task" });
    console.log("Error : ", err);
  } finally {
    if (db_conn_conn_conn_conn) db_conn.release();
  }
});

//Updating task
router.patch("/:taskId", async (req, res) => {
  //Est-ce le userId est nécessaire ici, parce que le taskId est incrémentale pour éviter toute duplication d'id
  //à moins que le task_id n'est relatif qu'à son utilisateur
  //Si c'est le cas, on doit aussi modifier la requête à la DB WHERE task_id=? & userId=?
  const userId = req.params.userId;
  const taskId = req.params.taskId;
  let db_conn;

  try {
    db_conn = await pool.getConnection();
    const sqlQuery = `UPDATE TABLE tasks SET completed=true WHERE task_id=?`;
    const result = await db_conn.execute(sqlQuery, [taskId]);
    res.json({
      message: "Task updated successfully !",
    });
    console.log("Task updated successfully !");
  } catch (err) {
    res.send(500).json({
      error: "Error while updating task",
    });
    console.log("Error : ", err);
  } finally {
    if (db_conn) db_conn.release();
  }
});

//Deleting task
router.delete("/:taskId", async (req, res) => {
  //Est-ce le userId est nécessaire ici, parce que le taskId est incrémentale pour éviter toute duplication d'id
  //à moins que le task_id n'est relatif qu'à son utilisateur
  //Si c'est le cas, on doit aussi modifier la requête à la DB WHERE task_id=? & userId=?
  const userId = req.params.userId;
  const taskId = req.params.taskId;
  const sqlQuery = `DELETE FROM tasks WHERE task_id = ?`;
  let db_conn;
  try {
    db_conn = await pool.getConnection();
    const result = await db_conn.execute(sqlQuery, [taskId]);
    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Error while deleting task",
    });
  } finally {
    if (db_conn) db_conn.release();
  }
});

module.exports = router;
