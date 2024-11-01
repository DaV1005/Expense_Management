const express = require('express');
const { signup, login ,getUser, logout} = require('../controllers/users');
const verifyToken  = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyToken, getUser);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', verifyToken, logout);


module.exports = router;
