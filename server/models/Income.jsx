const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  income: String,
  amount2: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  date: { type: Date },
});

const IncomeModel = mongoose.model("incomes", IncomeSchema);
module.exports = IncomeModel;
