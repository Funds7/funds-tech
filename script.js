let balance = 1000;

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

function addTrade(type, amount) {
  const li = document.createElement("li");
  li.innerText = type + " $" + amount;
  document.getElementById("trades").appendChild(li);
}
