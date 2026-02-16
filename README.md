

🚀 ExpenseTracker

ExpenseTracker is a full-stack MERN application that helps users track daily expenses, categorize spending, and gain insights into their financial habits through a clean and simple interface.

🔗 GitHub Repository
👉 https://github.com/2002tanmay/ExpenseTracker

Demo video link-https://drive.google.com/file/d/1rjVG36e5gDluiB85YHtd6WcMHnzQbz46/view?usp=sharing

🧠 What This Project Solves

Managing daily expenses manually is inefficient and error-prone. ExpenseTracker provides:

Easy expense tracking

Category-wise expense management

Secure authentication

Clear spending overview

Better personal finance control

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

⚙️ Local Setup
1️⃣ Clone Repository
git clone https://github.com/2002tanmay/ExpenseTracker.git
cd ExpenseTracker

2️⃣ Backend Setup
cd backend
npm install


Create .env file inside backend folder:

MONGO_URL=your_mongodb_connection_string
PORT=4000
JWT_SECRET=your_secret_key


Start backend:

npm run dev


Backend runs at:

http://localhost:4000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

🔗 API Overview
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/expenses	Get all expenses
POST	/api/expenses	Add expense
DELETE	/api/expenses/:id	Delete expense
✨ Features

JWT-based authentication

Add & delete expenses

Category-wise expense tracking

Secure backend APIs

Clean & responsive UI

🔐 Security

JWT authentication

Protected API routes

MongoDB Atlas secure connection

Environment variable protection

📈 Future Enhancements

Expense analytics charts

Monthly budget limits

Export expenses (CSV / PDF)

Mobile-first UI

Cloud sync

👨‍💻 Author

Tanmay Shivhare
Full-Stack Developer
GitHub: https://github.com/2002tanmay
