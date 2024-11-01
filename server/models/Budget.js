const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: { type: String, required: true },
  limit: { type: Number, required: true }, // The budget limit for a specific category
  spent: { type: Number, default: 0 }, // The amount spent in the category
  period: { type: String, default: 'monthly' }, // monthly, yearly, etc.
  createdAt: { type: Date, default: Date.now }
})

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;