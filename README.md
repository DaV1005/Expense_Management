# Expenses Management System

==========================

A full-stack web application that allows users to manage their expenses by adding, editing, and deleting records. The application features JWT-based authentication for secure access, dynamic state management with React Hooks, and robust backend API communication.

## Table of Contents

-----------------

*   [Features](#features)

*   [Technologies Used](#technologies-used)

*   [Getting Started](#getting-started)

*   [Installation](#installation)

*   [Environment Variables](#environment-variables)

*   [Usage](#usage)

*   [API Endpoints](#api-endpoints)

*   [Project Structure](#project-structure)

*   [License](#license)

## Features

--------

*   **User Authentication**: Secure login/signup with JWT-based authentication.

*   **Expense Management**: Add, edit, and delete expenses.

*   **Dynamic State Management**: Frontend state managed with React Hooks.

*   **Persistent Data Storage**: MongoDB database for storing user and expense data.

*   **Responsive Design**: Mobile-friendly UI built with React and Tailwind CSS.

## Technologies Used

-----------------

*   **Frontend**: React, Axios, Tailwind CSS

*   **Backend**: Node.js, Express.js, JWT

*   **Database**: MongoDB

*   **API Communication**: Axios

## Getting Started

---------------

To get a local copy up and running, follow these steps.

### Prerequisites

*   Node.js and npm installed on your machine.

*   MongoDB instance (local or cloud, such as MongoDB Atlas).

Installation

------------

1\.  git clone [https://github.com/yourusername/expenses-management-system.git](https://github.com/DaV1005/Expense_Management.git)

2\.  cd expenses-management-system

3\.  **Install dependencies for both frontend and backend**:

    *  cd backend npm install

    *  cd ../frontend npm install

4\.  **Set up environment variables** (see [Environment Variables](#environment-variables) section for details).

Environment Variables

---------------------

Create a .env file in the backend/ directory and add the following:

MONGO_URI = your_mongo_database_uri
JWT_SECRET = your_jwt_secret
PORT = 5555


*   MONGO\_URI: MongoDB connection string.

*   JWT\_SECRET: Secret key for JWT token signing.

*   PORT: Port for the backend server (default is 5555).

Usage

-----

1\.  cd backend npm run dev

2\. cd frontend npm run dev


API Endpoints

-------------

### Authentication

*   POST /api/users/signup: User registration.

*   POST /api/users/login: User login and JWT token generation.

### Expenses

*   GET /api/expenses: Fetch all expenses for the authenticated user.

*   POST /api/expenses: Add a new expense.

*   PUT /api/expenses/:id: Update an existing expense.

*   DELETE /api/expenses/:id: Delete an expense.

