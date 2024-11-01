const Budget = require('../models/Budget');
const User = require('../models/Users');
const mongoose = require('mongoose')
const createHttpError = require('http-errors');

//Create a budget
exports.addBudget = async (req, res, next) => {
    const {category, limit, period} = req.body;
    const user = await User.findById(req.userId).select('-password');

    try {
       const newBudget = await Budget.create({
        userId: user,
        category: category,
        limit: limit,
        period: period,
       })
       res.status(201).json(newBudget);

    } catch (error) {
        next(error);
    }
}


// Delete an expense
exports.deleteBudget = async (req, res, next) => {
    const budgetId = req.params.budgetId;
    const user = await User.findById(req.userId).select('-password');

  try {

    if (!mongoose.isValidObjectId(budgetId)) {
      throw createHttpError(400, "Invalid budget id");
    }

    const budget = await Budget.findById(budgetId).exec();
    
    if(!budget){
      throw createHttpError(404, "Budget not found");
    }

    if(!budget.userId.equals(user._id)){
      throw createHttpError(401, "You cannot access this budget");
    }

    await budget.deleteOne();
    
    res.json({ msg: 'Expense removed' });
  } catch (err) {
    next(err);
  }
};
