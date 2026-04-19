function login() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function logout() {
  document.getElementById("loginScreen").style.display = "block";
  document.getElementById("app").style.display = "none";
}

function buy() {
  addTrade("BUY $100");
}

function sell() {
  addTrade("SELL $100");
}

function addTrade(text) {
  const li = document.createElement("li");
  li.innerText = text + " - " + new Date().toLocaleTimeString();
  document.getElementById("trades").appendChild(li);
}
