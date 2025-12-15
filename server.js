const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

/* ---------- MySQL ---------- */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123", // change if needed
  database: "stock_dashboard"
});

db.connect(() => console.log("✅ MySQL connected"));

/* ---------- Stocks ---------- */
const STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];
let prices = {};

STOCKS.forEach(s => prices[s] = Math.floor(Math.random() * 1000) + 500);

setInterval(() => {
  STOCKS.forEach(s => {
    prices[s] += Math.floor(Math.random() * 20 - 10);
    if (prices[s] < 1) prices[s] = 1;
  });
  io.emit("prices", prices);
}, 1000);

/* ---------- Register ---------- */
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hash],
    (err, result) => {
      if (err) return res.json({ success: false });
      res.json({ success: true, userId: result.insertId, email });
    }
  );
});

/* ---------- Login ---------- */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, rows) => {
    if (!rows.length) return res.json({ success: false });

    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) return res.json({ success: false });

    db.query(
      "SELECT stock_code FROM subscriptions WHERE user_id=?",
      [rows[0].id],
      (err, subs) => {
        res.json({
          success: true,
          email,
          userId: rows[0].id,
          subscribed: subs.map(s => s.stock_code)
        });
      }
    );
  });
});

/* ---------- Save Subscriptions ---------- */
app.post("/subscribe", (req, res) => {
  const { userId, stocks } = req.body;

  db.query("DELETE FROM subscriptions WHERE user_id=?", [userId], () => {
    if (!stocks.length) return res.json({ success: true });
    const values = stocks.map(s => [userId, s]);
    db.query(
      "INSERT INTO subscriptions (user_id, stock_code) VALUES ?",
      [values],
      () => res.json({ success: true })
    );
  });
});

/* ---------- Socket ---------- */
io.on("connection", socket => {
  socket.emit("prices", prices);
});

server.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000")
);
