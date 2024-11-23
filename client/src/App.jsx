import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import Expense from './pages/ExpensesManagement'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import UserProfile from './pages/UserProfile';
import HomePage from './pages/Homepage';
import TestUser from './pages/TestUser'

export default function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/update/:id" element={<Expense />} />         
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<TestUser />} />
        </Routes>
      </div>
    </Router>    
  )
}

