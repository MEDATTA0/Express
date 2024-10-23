const express = require("express");
const port = 3000;

const app = express();

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
const userRoutes = require("./routes/usersRoutes");
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Express");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error when launching server !\n", err);
  }
  console.log("Server listening on port ", port);
});
