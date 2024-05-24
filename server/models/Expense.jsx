const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  expense: String,
  amount1: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  date: { type: Date },
});

const ExpenseModel = mongoose.model("expenses", ExpenseSchema);
module.exports = ExpenseModel;
