// ================= LOAD DATA =================
let balance = Number(localStorage.getItem("balance")) || 1000;
let btcOwned = Number(localStorage.getItem("btc")) || 0;
let lastBuyPrice = Number(localStorage.getItem("lastPrice")) || 0;
let historyData = JSON.parse(localStorage.getItem("history")) || [];
let position = JSON.parse(localStorage.getItem("position")) || {
  size: 0,
  avgPrice: 0
};
// ================= PRICE =================
async function getBTCPrice() {
  try {
    let res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
    let data = await res.json();

    let price = parseFloat(data.price);

    let el = document.getElementById("price");
    if (el) el.innerText = price.toFixed(2);

    return price;

  } catch (error) {
    console.log("Price error:", error);

    let el = document.getElementById("price");
    if (el) el.innerText = "Error";
  }
}

// ================= BUY =================
async function buyBTC() {
  let price = await getBTCPrice();

  let invest = balance * 0.2; // 20% per trade
  if (invest < 1) return alert("Not enough balance");

  let btcBought = invest / price;

  // update average price (REAL TRADING LOGIC)
  position.avgPrice =
    (position.avgPrice * position.size + price * btcBought) /
    (position.size + btcBought);

  position.size += btcBought;
  balance -= invest;

  saveData();
  addHistory(`🟢 BUY ${btcBought.toFixed(6)} BTC @ $${price.toFixed(2)}`);
}

// ================= SELL =================
async function sellBTC() {
  let price = await getBTCPrice();

  if (position.size <= 0) return alert("No position");

  let sellValue = position.size * price;
  let costValue = position.size * position.avgPrice;

  let profit = sellValue - costValue;

  addHistory(
    `🔴 SELL ${position.size.toFixed(6)} BTC @ $${price.toFixed(2)} | P/L: ${
      profit >= 0 ? "+" : ""
    }$${profit.toFixed(2)}`
  );

  // RESET POSITION FIRST
  position.size = 0;
  position.avgPrice = 0;

  balance += sellValue;

  saveData();
  updateUI();
}

// ================= SAVE =================
function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("history", JSON.stringify(historyData));
  localStorage.setItem("position", JSON.stringify(position));
  updateUI();
}

// ================= UI =================
function updateUI() {
  document.getElementById("balance").innerText = balance.toFixed(2);

  let btcEl = document.getElementById("btc");
  if (btcEl) btcEl.innerText = position.size.toFixed(6);

  let hist = document.getElementById("history");
  if (hist) {
    hist.innerHTML = "";
    historyData.forEach(h => {
      let p = document.createElement("p");
      p.innerText = h;
      hist.appendChild(p);
    });
  }
}

// ================= HISTORY =================
function addHistory(text) {
  historyData.unshift(text);
  saveData();
}

// ================= LOGIN =================
function login() {
  let input = document.getElementById("usernameInput");
  if (!input || input.value === "") return alert("Enter username");

  localStorage.setItem("user", input.value);
  window.location.href = "dashboard.html";
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// ================= INIT ====================
window.addEventListener("load", () => {
  position = JSON.parse(localStorage.getItem("position")) || {
    size: 0,
    avgPrice: 0
  };

  let user = localStorage.getItem("user");
  let nameEl = document.getElementById("username");
  if (user && nameEl) nameEl.innerText = user;

  updateUI();
  getBTCPrice();
  setInterval(getBTCPrice, 5000);
});
