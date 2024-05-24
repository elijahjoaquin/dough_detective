import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Home({ user }) {
  console.log("User in Home component:", user);
  const [expense, setExpense] = useState("");
  const [amount1, setAmount1] = useState("");
  const [income, setIncome] = useState("");
  const [amount2, setAmount2] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Initialize with current month

  useEffect(() => {
    axios
      .get("http://localhost:3001/expenses", {
        params: {
          userId: user._id,
          month: selectedMonth,
        },
      })
      .then((response) => {
        setExpenses(response.data);
        const total = response.data.reduce(
          (acc, curr) => acc + parseFloat(curr.amount1),
          0
        );
        setTotalExpense(total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, selectedMonth]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/incomes", {
        params: {
          userId: user._id,
          month: selectedMonth,
        },
      })
      .then((response) => {
        setIncomes(response.data);
        const total = response.data.reduce(
          (acc, curr) => acc + parseFloat(curr.amount2),
          0
        );
        setTotalIncome(total);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, selectedMonth]);

  const handleSubmit1 = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString();

    axios
      .post("http://localhost:3001/expenses", {
        expense,
        amount1,
        userId: user._id,
        date: currentDate,
      })
      .then((result) => {
        console.log(result);
        setExpense("");
        setAmount1("");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString();

    axios
      .post("http://localhost:3001/incomes", {
        income,
        amount2,
        userId: user._id,
        date: currentDate,
      })
      .then((result) => {
        console.log(result);
        setIncome("");
        setAmount2("");
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  const handleDeleteExpense = (id) => {
    axios
      .delete(`http://localhost:3001/expenses/${id}`)
      .then((response) => {
        console.log(response.data.message);
        setShowSuccessDelete(true);
        setTimeout(() => setShowSuccessDelete(false), 5000);
        setExpenses(expenses.filter((expense) => expense._id !== id));
        const total = expenses.reduce(
          (acc, curr) => acc + parseFloat(curr.amount1),
          0
        );
        setTotalExpense(total);
      })
      .catch((error) => {
        console.error("Error deleting expense:", error);
      });
  };

  const handleDeleteIncome = (id) => {
    axios
      .delete(`http://localhost:3001/incomes/${id}`)
      .then((response) => {
        console.log(response.data.message);
        setShowSuccessDelete(true);
        setTimeout(() => setShowSuccessDelete(false), 5000);
        setIncomes(incomes.filter((income) => income._id !== id));
        const total = incomes.reduce(
          (acc, curr) => acc + parseFloat(curr.amount2),
          0
        );
        setTotalIncome(total);
      })
      .catch((error) => {
        console.error("Error deleting income:", error);
      });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <div className="home-container">
      {user && (
        <h1>
          Welcome back,<span className="first-name"> {user.firstName}</span>{" "}
        </h1>
      )}
      {showSuccessMessage && (
        <div className="success-message">Added successfully!</div>
      )}
      {showSuccessDelete && (
        <div className="success-delete">Deleted successfully!</div>
      )}
      <div className="add-container">
        <div className="add-expense">
          <form onSubmit={handleSubmit1}>
            <h2>Add Expense</h2>
            <div className="input-group">
              <label htmlFor="expense">Expense:</label>
              <input
                type="text"
                required
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
              />
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                required
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
              />
              <button className="add-btn" type="submit">
                Add Expense
              </button>
            </div>
          </form>
        </div>
        <div className="add-income">
          <form onSubmit={handleSubmit2}>
            <h2>Add Income</h2>
            <div className="input-group">
              <label htmlFor="income">Income:</label>
              <input
                type="text"
                required
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                required
                value={amount2}
                onChange={(e) => setAmount2(e.target.value)}
              />
              <button className="add-btn" type="submit">
                Add Income
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="dropdown-container">
        <label htmlFor="month">Select Month: </label>
        <select id="month" value={selectedMonth} onChange={handleMonthChange}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div className="total-container">
        <h2>Total Amount Saved</h2>
        <h3>Total: {formatPrice(totalIncome - totalExpense)}</h3>
      </div>
      <div className="expenses-container">
        <h2>Total Expenses</h2>
        <h3>Total: {formatPrice(totalExpense)}</h3>
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              {expense.expense}: {formatPrice(expense.amount1)} -{" "}
              {new Date(expense.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              <button onClick={() => handleDeleteExpense(expense._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="incomes-container">
        <h2>Total Incomes</h2>
        <h3>Total: {formatPrice(totalIncome)}</h3>
        <ul>
          {incomes.map((income) => (
            <li key={income._id}>
              {income.income}: {formatPrice(income.amount2)} -{" "}
              {new Date(income.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              <button onClick={() => handleDeleteIncome(income._id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
