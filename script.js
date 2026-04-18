let balance = 900;

function sendMoney() {
  balance -= 100;
  document.getElementById("balance").innerText = balance;
}
