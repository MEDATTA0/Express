const express = require("express");
const port = 3000;

const app = express();

const todoRoutes = require("./routes/todosRoutes");

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Express");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error when launching server !\n", err);
  }
  console.log("Server listening on port ", port);
});
