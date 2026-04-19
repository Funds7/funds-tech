let balance = 1000;
let position = null; // {price, amount}
let price = 100;

// ===== LIVE MARKET ENGINE =====
setInterval(() => {
  let change = (Math.random() - 0.5) * 3;
  price += change;

  if (price < 1) price = 1;

  updateUI();
}, 1500);

// ===== LOGIN =====
function login() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";

  updateUI();
}

// ===== BUY =====
function buy() {
  if (position) return; // only 1 position for simplicity

  let amount = 1; // 1 unit asset
  let cost = price * amount;

  if (balance < cost) return;

  balance -= cost;
  position = { price, amount };

  addTrade("BUY", price);

  updateUI();
}

// ===== SELL =====
function sell() {
  if (!position) return;

  let profit = (price - position.price) * position.amount;
  balance += (position.price * position.amount) + profit;

  addTrade("SELL", price + " | P/L: $" + profit.toFixed(2));

  position = null;

  updateUI();
}

// ===== UI UPDATE =====
function updateUI() {
  document.querySelector(".balance-card h1").innerText =
    "$" + balance.toFixed(2);

  let priceEl = document.getElementById("price");
  priceEl.innerText = "$" + price.toFixed(2);

  // color effect (pro feel)
  if (position) {
    let pnl = (price - position.price);
    priceEl.style.color = pnl >= 0 ? "#00c853" : "#ff3d00";
  } else {
    priceEl.style.color = "white";
  }
}

// ===== TRADE LOG =====
function addTrade(type, info) {
  let li = document.createElement("li");
  li.innerText =
    type + " → " + info + " • " + new Date().toLocaleTimeString();

  document.getElementById("trades").appendChild(li);
}
