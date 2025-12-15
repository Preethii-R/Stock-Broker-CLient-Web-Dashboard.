document.addEventListener("DOMContentLoaded", () => {

  const socket = io("http://localhost:3000");

  /* ---------- DOM ELEMENTS ---------- */
  const loginBox = document.getElementById("loginBox");
  const registerBox = document.getElementById("registerBox");
  const dashboard = document.getElementById("dashboard");
  const user = document.getElementById("user");
  const stocksDiv = document.getElementById("stocks");

  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const regEmail = document.getElementById("regEmail");
  const regPassword = document.getElementById("regPassword");

  let userId = null;
  let subscribedStocks = [];

  /* ---------- UI SWITCH ---------- */
  window.showRegister = function () {
    loginBox.style.display = "none";
    registerBox.style.display = "block";
  };

  /* ---------- REGISTER ---------- */
  window.register = function () {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: regEmail.value,
        password: regPassword.value
      })
    })
    .then(res => res.json())
    .then(d => {
      if (!d.success) return alert("User already exists");

      userId = d.userId;

      loginBox.style.display = "none";
      registerBox.style.display = "none";
      dashboard.style.display = "block";

      user.innerText = "Welcome, " + regEmail.value;
    })
    .catch(err => alert(err.message));
  };

  /* ---------- LOGIN ---------- */
  window.login = function () {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loginEmail.value,
        password: loginPassword.value
      })
    })
    .then(res => res.json())
    .then(d => {
      if (!d.success) return alert("Invalid credentials");

      userId = d.userId;
      subscribedStocks = d.subscribed;

      loginBox.style.display = "none";
      registerBox.style.display = "none";
      dashboard.style.display = "block";

      user.innerText = "Welcome, " + loginEmail.value;

      document.querySelectorAll(".subscription input[type=checkbox]")
        .forEach(cb => cb.checked = subscribedStocks.includes(cb.value));
    })
    .catch(err => alert(err.message));
  };

  /* ---------- SAVE SUBSCRIPTIONS ---------- */
  window.subscribeStocks = function () {
    subscribedStocks = [...document.querySelectorAll(
      ".subscription input[type=checkbox]:checked"
    )].map(cb => cb.value);

    fetch("http://localhost:3000/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, stocks: subscribedStocks })
    });
  };

  /* ---------- LIVE PRICES ---------- */
  socket.on("prices", prices => {
    stocksDiv.innerHTML = "";
    subscribedStocks.forEach(stock => {
      stocksDiv.innerHTML += `
        <div class="stock">
          <div>${stock}</div>
          <div class="price">$${prices[stock]}</div>
        </div>
      `;
    });
  });

});
