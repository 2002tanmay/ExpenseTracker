🚀 ExpenseTracker

ExpenseTracker is a full-stack MERN application that allows users to track daily expenses, manage categories, and understand their spending habits through a simple and clean interface.

🔗 GitHub Repository
https://github.com/2002tanmay/ExpenseTracker

📌 Problem Statement

Managing personal expenses manually is inefficient and unorganized. ExpenseTracker provides a centralized platform to securely record expenses, categorize spending, and maintain a clear financial overview.

🛠️ Tech Stack
Frontend

React.js

Context API

Axios

CSS

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

JWT Authentication

📁 Project Structure
ExpenseTracker/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ExpenseContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md

⚙️ Local Setup Guide
Step 1: Clone the Repository
git clone https://github.com/2002tanmay/ExpenseTracker.git
cd ExpenseTracker

Step 2: Backend Setup
cd backend
npm install


Create a .env file inside the backend folder:

MONGO_URL=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_jwt_secret


Start the backend server:

npm run dev


Backend will run on:

http://localhost:4000

Step 3: Frontend Setup
cd frontend
npm install
npm start


Frontend will run on:

http://localhost:3000

🔗 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	User login
GET	/api/expenses	Fetch all expenses
POST	/api/expenses	Add new expense
DELETE	/api/expenses/:id	Delete expense
✨ Features

Secure JWT-based authentication

Add and delete expenses

Category-wise expense tracking

Protected backend APIs

Clean and responsive UI

🔐 Security Practices

JWT authentication

Environment variables for secrets

MongoDB Atlas secure connection

Protected routes

🚀 Future Enhancements

Expense analytics dashboard

Monthly budget limits

Expense export (CSV / PDF)

Mobile responsive design

👨‍💻 Author

Tanmay Shivhare
Full-Stack Developer
GitHub: https://github.com/2002tanmay
