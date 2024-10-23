const express = require("express");
const pool = require("./db_connect");
const router = express.Router();
router.use(express.json());
router.get("/List", (req, res) => {
  const sqlQuery = "SELECT * FROM tasks";
  pool
    .query(sqlQuery)
    .then((rows) => {
      if (rows.length === 0) {
        res.json({ response: "Task empty !" });
      }
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).send("Server Error");
      console.log("Error : ", err);
    });
});

router.get("/createTodo", (req, res) => {
  fetch("https://dummyjson.com/todos")
    .then((res) => res.json(res.todos))
    .then((data) => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const userId = 5;
        const sqlQuery = `INSERT INTO tasks (title, completed, userId) VALUES ('${element.todo}', '${element.completed}', ${userId})`;
        pool
          .query(sqlQuery)
          .then((rows) => {
            res.json(rows);
            console.log("Todo sent successfully !");
          })
          .catch((err) => {
            console.error("Error while fetching database : ", err);
          });
      }
    });

  //   const { title, task_description, isCompleted } = req.body;
  //   // On changera le userId lorsqu'on gerera plusieurs utilisateurs
  //   const userId = 5;
  //   const sqlQuery = `INSERT INTO tasks (title, task_description, completed, userId) VALUES (${title}, ${task_description}, ${isCompleted}, ${userId})`;
  //   pool
  //     .query(sqlQuery)
  //     .then((rows) => {
  //       res.json(rows);
  //       console.log("Todo sent successfully !");
  //     })
  //     .catch((err) => {
  //       console.error("Error while fetching database : ", err);
  //     });
});

module.exports = router;
