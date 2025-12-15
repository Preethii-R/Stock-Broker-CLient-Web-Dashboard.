**Stock Broker Client Web Dashboard**

A real-time stock broker client web dashboard that allows users to register, log in, subscribe to stocks, and view live price updates without refreshing the page.
The application supports multiple users simultaneously with independent subscriptions and asynchronous updates.

**Features**

1. User registration and login using email & password

2. Secure authentication with hashed passwords

3. Subscribe to supported stock ticker symbols

4. Live stock price updates using WebSockets (Socket.IO)

5. Each user sees only their subscribed stocks

6. Subscription data is persisted in SQL database

7. Supports multiple users at the same time

8. Clean, modern dashboard UI

**Tech Stack**

*Frontend*

-HTML5 
-CSS3
-JavaScript  
-Socket.IO Client

*Backend*

-Node.js
-Express.js
-Socket.IO
-MySQL

 **Database Schema (MySQL)**

*user table*

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  balance DECIMAL(10,2) DEFAULT 100000
);

 *subscriptions table*
CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  stock_code VARCHAR(10),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

**Installation & Setup**
1️ Clone the repository
git clone https://github.com/your-username/stock-dashboard.git
cd stock-dashboard

2 Install dependencies
npm install

3 Setup MySQL Database

-Start MySQL server
-Create a database named stock_dashboard
-Run the SQL commands provided above to create tables

4️ Configure Database Credentials

In server.js, update:

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_mysql_password",
  database: "stock_dashboard"
});

5️ Start the Server

node server.js

Server will run at:
http://localhost:3000

6️ Run the Frontend

Open index.html using VS Code Live Server
OR serve the public folder via Express

**How It Works**

1. Users register or log in using email & password

2. Stock prices are generated randomly on the server every second

3. Prices are broadcast to all connected clients using Socket.IO

4. Users can subscribe/unsubscribe from stocks

5. Subscriptions are saved in MySQL and restored after login

6. Each dashboard updates in real time without refresh

**Future Improvements**

1. Logout & session management

2. Price change indicators

3. Historical price charts

4. Role-based access (Admin / User)

5. Real stock API integration

