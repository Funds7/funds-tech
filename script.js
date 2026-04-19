function login() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function logout() {
  document.getElementById("loginScreen").style.display = "block";
  document.getElementById("app").style.display = "none";
}

let balance = 1000;

function updateBalance() {
  document.querySelector(".balance-card h1").innerText = "$" + balance.toFixed(2);
}

function buy() {
  let amount = 50;
  balance -= amount;

  addTrade("BUY", amount);
  updateBalance();
}

function sell() {
  let amount = 50;
  balance += amount;

  addTrade("SELL", amount);
  updateBalance();
}

function addTrade(type, amount) {
  let li = document.createElement("li");
  li.innerText = type + " $" + amount + " - " + new Date().toLocaleTimeString();
  document.getElementById("trades").appendChild(li);
}
