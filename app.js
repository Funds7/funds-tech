function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if(user && pass){
    localStorage.setItem("user", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Enter details");
  }
}

// ===================== DASHBOARD =====================
let user = localStorage.getItem("user");

if(document.getElementById("balance")) {

  if(!user){
    window.location.href = "index.html";
  }

  document.getElementById("user").innerText = user;

  let balance = localStorage.getItem(user+"_balance");

  if(!balance || isNaN(balance)){
    balance = 1000;
  }

  balance = parseFloat(balance);

  document.getElementById("balance").innerText = balance;

  function save(){
    localStorage.setItem(user+"_balance", balance);
  }

  function addHistory(text){
    let li = document.createElement("li");
    li.innerText = text;
    document.getElementById("history").appendChild(li);
  }

  window.buy = function(){
    let amt = parseFloat(document.getElementById("amount").value);

    if(isNaN(amt) || amt <= 0) return alert("Enter valid amount");
    if(amt > balance) return alert("Not enough balance");

    balance -= amt;
    document.getElementById("balance").innerText = balance;

    addHistory("BUY $" + amt);
    save();
  }

  window.sell = function(){
    let amt = parseFloat(document.getElementById("amount").value);

    if(isNaN(amt) || amt <= 0) return alert("Enter valid amount");

    balance += amt;
    document.getElementById("balance").innerText = balance;

    addHistory("SELL $" + amt);
    save();
  }

  window.logout = function(){
    localStorage.removeItem("user");
    window.location.href = "index.html";
  }
}

// ===================== LIVE PRICES =====================
async function loadPrices() {
  try {
    let res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
    let data = await res.json();

    if(document.getElementById("btc")){
      document.getElementById("btc").innerText = data.bitcoin.usd;
    }

    if(document.getElementById("eth")){
      document.getElementById("eth").innerText = data.ethereum.usd;
    }

  } catch (err) {
    console.log("Price error", err);
  }
}

// run safely only on dashboard
if(document.getElementById("btc")){
  loadPrices();
  setInterval(loadPrices, 10000);
}
