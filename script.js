let strategy = {
  takeProfit: 0.5,
  stopLoss: 0.3,
  tradeAmount: 100
};

let balance = Number(localStorage.getItem("balance")) || 1000;

let position = JSON.parse(localStorage.getItem("position")) || {
  size: 0,
  avgPrice: 0
};

let historyData = JSON.parse(localStorage.getItem("history")) || [];

let lastAction = 0;
let lastSeenPrice = 0;

let tradingInterval = null; // ✅ correct

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
  if (!price) return;

  let invest = strategy.tradeAmount;

  if (balance < invest) return;

  let btcBought = invest / price;

  position.avgPrice =
    (position.avgPrice * position.size + price * btcBought) /
    (position.size + btcBought);

  position.size += btcBought;
  balance -= invest;

  lastAction = Date.now(); // FIX

  saveData();
  addHistory(`🟢 BUY ${btcBought.toFixed(6)} BTC @ $${price.toFixed(2)}`);
}

// ================= SELL =================
async function sellBTC() {
  let price = await getBTCPrice();
  if (!price || position.size <= 0) return;

  let sellValue = position.size * price;
  let costValue = position.size * position.avgPrice;

  let profit = sellValue - costValue;

  balance += sellValue;

  addHistory(
    `🔴 SELL ${position.size.toFixed(6)} BTC @ $${price.toFixed(2)} | P/L: ${
      profit >= 0 ? "+" : ""
    }$${profit.toFixed(2)}`
  );

  position.size = 0;
  position.avgPrice = 0;

  lastAction = Date.now();

  saveData();
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

// ================= INIT + TRADING BOT ====================

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

  startTradingBot(); // 🚀 start bot

  setInterval(getBTCPrice, 5000);
});

function startTradingBot() {
  if (tradingInterval) clearInterval(tradingInterval);

  tradingInterval = setInterval(async () => {
    let price = await getBTCPrice();
    if (!price) return;

    let now = Date.now();

    if (now - lastAction < 15000) return;

    if (lastSeenPrice === 0) {
      lastSeenPrice = price;
      return;
    }

    // ENTRY
    if (position.size === 0) {
      let dipBuy = price < lastSeenPrice * 0.998;

      if (dipBuy) {
        lastAction = now;
        await buyBTC();
      }
    }

    // EXIT
    else {
      let change =
        ((price - position.avgPrice) / position.avgPrice) * 100;

      if (
        change >= strategy.takeProfit ||
        change <= -strategy.stopLoss
      ) {
        lastAction = now;
        await sellBTC();
      }
    }

    lastSeenPrice = price;
  }, 10000);
}
