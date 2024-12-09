const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

app.listen(8020, () => {
  console.log("server has started on port 8020");
});

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todoes (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todoes");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todoes WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const updatedTodo = await pool.query(
      "UPDATE todoes SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );
    res.json(
      "Todo " + id + " was updated to: " + updatedTodo.rows[0].description
    );
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todoes WHERE todo_id = $1 RETURNING *",
      [id]
    );
    res.json(
      "Todo " +
        id +
        "(" +
        deletedTodo.rows[0].description +
        ")" +
        " was deleted."
    );
  } catch (err) {
    console.error(err.message);
  }
});
