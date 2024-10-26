import express from "express";
const port = 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
import userRoutes from "./routes/usersRoutes.js";
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
