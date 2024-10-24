const pool = require("../db/db_connect");

exports.getAllTodos = async () => {
  let db_conn;
  let response;
  try {
    db_conn = await pool.getConnection();
    const sqlQuery = "SELECT * FROM tasks";
    const rows = await db_conn.execute(sqlQuery);
    response = rows;
  } catch (err) {
    response = err;
    console.log("error : ", err);
  } finally {
    if (db_conn) db_conn.release();
    return response;
  }
};

exports.getTodos = async (userId) => {
  const userId = req.params.userId;
  let db_conn;
  let response;
  try {
    db_conn = await pool.getConnection();
    const sqlQuery = "SELECT * FROM tasks WHERE userId=? ";
    const rows = await db_conn.execute(sqlQuery, [userId]);
    response = rows;
  } catch (err) {
    response = err;
    console.log("Error : ", err);
  } finally {
    if (pool) db_conn.release();
    return response;
  }
};

exports.createTodo = async (userId, title, task_description, isCompleted) => {
  // Checking if variables are falsy or null
  if (!title || !task_description || typeof isCompleted === "undefined") {
    return res.status(400).json({ error: "Please fill fields." });
  }
  let response;
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
    response = result;
  } catch (err) {
    response = err;
    console.log("Error : ", err);
  } finally {
    if (db_conn) db_conn.release();
    return response;
  }
};
