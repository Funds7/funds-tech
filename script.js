let balance = 1000;
let trades = [];

function buy() {
  let amount = 100;

  if (balance < amount) {
    alert("Not enough balance");
    return;
  }

  balance -= amount;
  addTrade("BUY", amount);
  updateUI();
}

function sell() {
  let amount = 100;

  balance += amount;
  addTrade("SELL", amount);
  updateUI();
}

function updateUI() {
  document.getElementById("balance").innerText = balance;
}

function addTrade(type, amount) {
  const time = new Date().toLocaleTimeString();

  const trade = {
    type,
    amount,
    time
  };

  trades.unshift(trade);
  renderTrades();
}

function renderTrades() {
  const list = document.getElementById("trades");
  list.innerHTML = "";

  trades.forEach(t => {
    const li = document.createElement("li");
    li.innerText = `${t.type} $${t.amount} - ${t.time}`;
    list.appendChild(li);
  });
}
