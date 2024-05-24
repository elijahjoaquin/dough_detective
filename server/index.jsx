const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AccountModel = require("./models/Account.jsx");
const ExpenseModel = require("./models/Expense.jsx");
const IncomeModel = require("./models/Income.jsx");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");

app.post("/accounts", async (req, res) => {
  const { username } = req.body;

  const existingUser = await AccountModel.findOne({ username: username });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  AccountModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/expenses", async (req, res) => {
  ExpenseModel.create(req.body)
    .then((expenses) => res.json(expenses))
    .catch((err) => res.json(err));
});

app.get("/expenses", async (req, res) => {
  try {
    const { userId, month } = req.query;

    let expenses;
    if (userId && month) {
      const startOfMonth = new Date(
        Date.UTC(new Date().getFullYear(), month - 1, 1)
      );
      const endOfMonth = new Date(
        Date.UTC(new Date().getFullYear(), month, 0, 23, 59, 59)
      );

      expenses = await ExpenseModel.find({
        userId: userId,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      });
    } else if (userId) {
      expenses = await ExpenseModel.find({ userId: userId });
    } else {
      expenses = await ExpenseModel.find();
    }

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/incomes", async (req, res) => {
  IncomeModel.create(req.body)
    .then((incomes) => res.json(incomes))
    .catch((err) => res.json(err));
});

app.get("/incomes", async (req, res) => {
  try {
    const { userId, month } = req.query;

    let incomes;
    if (userId && month) {
      const startOfMonth = new Date(
        Date.UTC(new Date().getFullYear(), month - 1, 1)
      );
      const endOfMonth = new Date(
        Date.UTC(new Date().getFullYear(), month, 0, 23, 59, 59)
      );

      incomes = await IncomeModel.find({
        userId: userId,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      });
    } else if (userId) {
      incomes = await IncomeModel.find({ userId: userId });
    } else {
      incomes = await IncomeModel.find();
    }

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  AccountModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ user });
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ExpenseModel.findByIdAndDelete(id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/incomes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await IncomeModel.findByIdAndDelete(id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
