const express = require('express');
const verifyToken  = require("../middleware/auth");
const router = express.Router();
const { addBudget, deleteBudget } = require('../controllers/budget');

router.post('/', verifyToken, addBudget);
router.delete('/:budgetId', verifyToken, deleteBudget);

module.exports = router;
