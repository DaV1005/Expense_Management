
const userRoutes = require("./routers/users");
const expenseRoutes = require('./routers/expense');
const budgetRoutes = require('./routers/budget');


const cookieParser = require("cookie-parser");




const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

//Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(cookieParser());






//Basic route
app.get('/', (req,res)  => {
    res.send('Personal Finance Management API is running');
})


app.use("/api/users/", userRoutes);
app.use('/api/expenses/', expenseRoutes);
app.use('/api/budgets/', budgetRoutes);


//Connect to MongoDB
const Mongo_URI = process.env.MONGO_URI;
mongoose.connect(Mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
    

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server running on port ${PORT}`))
