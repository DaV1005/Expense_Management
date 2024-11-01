const express = require('express');
const { addExpense, getExpenses, getExpense, updateExpense, deleteExpense } = require('../controllers/expense');
const verifyToken  = require("../middleware/auth");
const router = express.Router();

router.get('/',verifyToken, getExpenses);       // get expenses
router.get('/:expenseId',verifyToken, getExpense);       // Fetch user expenses
router.post('/',verifyToken, addExpense);       // Create new expense

router.put('/:expenseId', verifyToken, updateExpense);  // Edit an expense
router.delete('/:expenseId', verifyToken, deleteExpense); // Delete an expense

module.exports = router;
