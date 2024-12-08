const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log("server has started on port 8000");
});

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todoes (description) VALUES($1)",
      [description]
    );
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

//update a todo

//delete a todo
