const pool = require("../db/db_connect");

exports.getTodos = async (userId) => {
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
};

exports.createTodo = async (userId, title, task_description, isCompleted) => {
  // Checking if variables are falsy or null
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
};
