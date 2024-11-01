const Expense = require('../models/Expense');
const User = require('../models/Users');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');

exports.getExpenses = async (req, res, next) =>{
  const user = await User.findById(req.userId).select('-password');

  try {
    const expenses = await Expense.find({userId: user}).exec();
    res.status(200).json(expenses)
  } catch (error) {
    next(error)
  }
};

exports.getExpense = async (req, res, next) => {
  const expenseId = req.params.expenseId;
  const user = await User.findById(req.userId).select('-password');

  try {
    if(!mongoose.isValidObjectId(expenseId)){
      throw createHttpError(400, "Invalid expense id");
    }

    const expense = await Expense.findById(expenseId).exec();

    if(!expense){
      throw createHttpError(404, "Expense not found");
    }

    if(!expense.userId.equals(user._id)){
      throw createHttpError(401, "You cannot access this expense");
    }

    res.status(200).json(expense);

  } catch (error) {
    next(error);
  }
};


exports.addExpense = async (req, res, next) => {
  const { name, amount, category } = req.body;
  const user = await User.findById(req.userId).select('-password');

  try {
    const newExpense = await Expense.create({
      userId: user,
      name: name,
      amount: amount,
      category: category,
    })
    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }

}


// Update an expense  
exports.updateExpense = async (req, res, next) => {
  const expenseId = req.params.expenseId;
  const { name, amount, category } = req.body;
  const user = await User.findById(req.userId).select('-password');

  try {
    if (!mongoose.isValidObjectId(expenseId)) {
      throw createHttpError(400, "Invalid expense id");
    }

    const expense = await Expense.findById(expenseId).exec();


    if(!expense){
      throw createHttpError(404, "Expense not found");
    }

    if(!expense.userId.equals(user._id)){
      throw createHttpError(401, "You cannot access this expense");
    }

    expense.name = name || expense.name;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    
    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (err) {
    // res.status(500).json({ msg: 'Server error' });
    next(err);
  }
};

// Delete an expense
exports.deleteExpense = async (req, res, next) => {
    const expenseId = req.params.expenseId;
    const user = await User.findById(req.userId).select('-password');

  try {

    if (!mongoose.isValidObjectId(expenseId)) {
      throw createHttpError(400, "Invalid expense id");
    }

    const expense = await Expense.findById(expenseId).exec();


    if(!expense){
      throw createHttpError(404, "Expense not found");
    }

    if(!expense.userId.equals(user._id)){
      throw createHttpError(401, "You cannot access this expense");
    }

    await expense.deleteOne();
    
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    next(err);
  }
};
