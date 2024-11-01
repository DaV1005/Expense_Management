const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    category: {type: String, required:true},
    date: {type:Date, defaut: Date.now}
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;

