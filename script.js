let balance = 1000;
let trades = [];

// LOGIN
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "" || pass === "") {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", user);

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// AUTO LOGIN IF USER EXISTS
window.onload = function () {
  const user = localStorage.getItem("user");

  if (user) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("app").style.display = "block";
  }
};

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// TRADING SYSTEM
function buy() {
  balance -= 100;
  addTrade("BUY", 100);
  updateUI();
}

function sell() {
  balance += 100;
  addTrade("SELL", 100);
  updateUI();
}

function updateUI() {
  document.getElementById("balance").innerText = balance;
}

// TRADE DISPLAY
function addTrade(type, amount) {
  const time = new Date().toLocaleTimeString();

  const li = document.createElement("li");

  li.innerText = `${type} $${amount} - ${time}`;

  if (type === "BUY") {
    li.style.color = "#00ff88";
  } else {
    li.style.color = "#ff4d4d";
  }

  document.getElementById("trades").prepend(li);
}
