# 📈 Stock Broker Client Web Dashboard

A real-time **Stock Broker Client Web Dashboard** built using **Node.js, Express, Socket.IO, MySQL, HTML, CSS, and JavaScript**.  
The application allows multiple users to **register, log in, subscribe to stocks**, and **view live-updating stock prices** without refreshing the page.

---

## ✨ Features

- **User Authentication**
  - Register using email and password
  - Login for existing users
  - Secure password hashing using *bcrypt*

- **Stock Subscription**
  - Subscribe to supported stocks using ticker codes  
  - Supported stocks:
    - **GOOG**
    - **TSLA**
    - **AMZN**
    - **META**
    - **NVDA**

- **Real-Time Price Updates**
  - Stock prices update **every second**
  - No page refresh required
  - Powered by **Socket.IO**

- **Multi-User Support**
  - Multiple users can log in simultaneously
  - Each user sees only their subscribed stocks
  - Dashboards update asynchronously

- **Persistent Subscriptions**
  - Stock subscriptions are stored in the database
  - Subscriptions remain the same after logout and login

- **Professional UI**
  - Dark-themed, modern dashboard design
  - Centered stock cards with live price display
  - Clean and minimal user experience

---

## 🛠 Tech Stack

- **Frontend**
  - HTML
  - CSS
  - JavaScript

- **Backend**
  - Node.js
  - Express.js
  - Socket.IO

- **Database**
  - MySQL

---

## 📂 Project Structure
```
Stock-Broker-Client-Web-Dashboard/
│
├── index.html        # Frontend UI
├── style.css         # Styling
├── script.js         # Frontend logic
├── server.js         # Backend server
├── package.json      # Project dependencies
└── README.md         # Project documentation
```



---

## 🗄 Database Schema

### **users**
- `id` (INT, PRIMARY KEY)
- `email` (VARCHAR, UNIQUE)
- `password` (VARCHAR)

### **subscriptions**
- `id` (INT, PRIMARY KEY)
- `user_id` (INT, FOREIGN KEY)
- `stock_code` (VARCHAR)

---

## 🚀 How to Run the Project

### 1️⃣ Install Dependencies
```
npm install

2️⃣ Start MySQL Server

- Create a database named stock_dashboard

- Create users and subscriptions tables as per schema

3️⃣ Start Backend Server

- node server.js

- Server runs at:

http://localhost:3000

4️⃣ Open Frontend

- Open index.html in browser
OR
- Use VS Code Live Server

🔄 Stock Price Simulation

- Stock prices are generated using a random number generator

- Prices change every second

This simulates real market behavior without using external APIs

```

🧪 Testing Multi-User Functionality

- Open dashboard in two different browsers

- Login with different users

- Subscribe to different stocks

- Observe live updates independently

📌 Notes

- No real stock market API is used

- This project focuses on real-time communication and system design

- Designed for academic submission and demonstrations

📎 Future Enhancements

- Logout functionality

- Session-based authentication

- Price trend indicators (up/down arrows)

- Real stock market API integration

- Role-based access (Admin / User)
  

👩‍💻 Author

Preethi R



