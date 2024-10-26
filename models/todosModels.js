// const pool = require("../db/db_connect");
import { Todo } from "../db/db_connect.js";

export async function db_getAllTodos() {
  //   let db_conn;
  let response;
  try {
    // db_conn = await pool.getConnection();
    // const sqlQuery = "SELECT * FROM todos";
    // const rows = await db_conn.execute(sqlQuery);
    // response = rows;
    const rows = await Todo.findAll({ where: { userId: userId } });
    response = rows;
  } catch (err) {
    response = err;
    console.log("error : ", err);
  } finally {
    // if (db_conn) db_conn.release();
    return response;
  }
}

export async function db_getTodos(userId) {
  //   let db_conn;
  let response;
  try {
    // db_conn = await pool.getConnection();
    // const sqlQuery = "SELECT * FROM todos WHERE userId=? ";
    // const rows = await db_conn.execute(sqlQuery, [userId]);
    const rows = await Todo.findAll({ where: { userId: userId } });
    response = rows;
  } catch (err) {
    response = err;
    console.log("Error : ", err);
  } finally {
    // if (pool) db_conn.release();
    return response;
  }
}

export async function db_getTodo(userId, todoId) {
  try {
    //findOne returns none if nothing is found
    const row = await Todo.findOne({ where: { id: todoId, userId: userId } })
    return row;
  } catch (error) {
    console.log("error : ", error);
    return error;
  }
}

export async function db_createTodo(
  userId,
  title,
  todo_description,
  isCompleted
) {
  let response;
  //   let db_conn;
  try {
    // db_conn = await pool.getConnection();
    // const sqlQuery = `INSERT INTO todos (title, todo_description, completed, userId) VALUES (?, ?, ?, ?)`;
    // const result = await db_conn_conn.execute(sqlQuery, [
    //   title,
    //   todo_description,
    //   isCompleted,
    //   userId,
    // ]);
    const result = await Todo.bulkCreate([
      { userId: userId },
      { title: title },
      { description: todo_description },
      { completed: isCompleted },
    ]);
    response = response;
  } catch (err) {
    response = err;
    console.log("Error : ", err);
  } finally {
    // if (db_conn) db_conn.release();
    return response;
  }
}

export async function db_updateTodo(userId, todoId, isCompleted) {
  try {
    const row = await Todo.update({ completed: isCompleted }, { where: { id: todoId, userId: userId } })
  } catch (error) {
    console.log("error : ", error)
    return error
  }
}

export async function db_deleteTodo(userId, todoId) {
  try {
    //destroy returns the number of the destroyed rows
    const row = await Todo.destroy({ where: { id: todoId, userId: userId } })
    return row;
  } catch (error) {
    console.log("error : ", error);
    return error;
  }
}