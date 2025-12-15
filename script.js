const socket = io("http://localhost:3000");

let userId = null;
let subscribedStocks = [];


function showRegister() {
  loginBox.style.display = "none";
  registerBox.style.display = "block";
}

/*  Register  */
function register() {
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
    if (d.success) {
      userId = d.userId;
      registerBox.style.display = "none";
      loginBox.style.display = "none";
      dashboard.style.display = "block";
      user.innerText = "Welcome!";
    } else {
      alert("User already exists");
    }
  });
}

/*  Login  */
function login() {
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
    if (d.success) {
      userId = d.userId;
      subscribedStocks = d.subscribed;

      loginBox.style.display = "none";
      registerBox.style.display = "none";
      dashboard.style.display = "block";
      user.innerText = "Welcome!";

      document.querySelectorAll(".subscription input[type=checkbox]").forEach(cb => {
        cb.checked = subscribedStocks.includes(cb.value);
      });
    } else {
      alert("Invalid credentials");
    }
  });
}

/* Subscriptions  */
function subscribeStocks() {
  subscribedStocks = [
    ...document.querySelectorAll(".subscription input[type=checkbox]:checked")
  ].map(cb => cb.value);

  fetch("http://localhost:3000/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, stocks: subscribedStocks })
  });
}

/*  Live Prices */
socket.on("prices", prices => {
  stocks.innerHTML = "";
  subscribedStocks.forEach(stock => {
    stocks.innerHTML += `
      <div class="stock">
        <div>${stock}</div>
        <div class="price">$${prices[stock]}</div>
      </div>
    `;
  });
});

