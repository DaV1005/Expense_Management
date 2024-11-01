import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5555' });

// Fetch user expenses
export const fetchExpenses = () => API.get('/api/expenses');

// Add a new expense
export const addExpense = (expenseData) => API.post('/api/expenses', expenseData);

// Update an expense
export const updateExpense = (id, expenseData) => API.put(`/api/expenses/${id}`, expenseData);

// Delete an expense
export const deleteExpense = (id) => API.delete(`/api/expenses/${id}`);
