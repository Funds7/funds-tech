// LOGIN
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

// DASHBOARD
let user = localStorage.getItem("user");

if(window.location.pathname.includes("dashboard")) {
  if(!user) window.location.href = "index.html";

  document.getElementById("user").innerText = user;

  let balance = localStorage.getItem(user+"_balance") || 1000;
  balance = parseFloat(balance);

  document.getElementById("balance").innerText = balance;

  function save(){
    localStorage.setItem(user+"_balance", balance);
  }

  window.buy = function(){
    let amt = parseFloat(document.getElementById("amount").value);
    if(amt > balance) return alert("Not enough balance");

    balance -= amt;
    document.getElementById("balance").innerText = balance;

    addHistory("BUY $" + amt);
    save();
  }

  window.sell = function(){
    let amt = parseFloat(document.getElementById("amount").value);

    balance += amt;
    document.getElementById("balance").innerText = balance;

    addHistory("SELL $" + amt);
    save();
  }

  window.logout = function(){
    localStorage.removeItem("user");
    window.location.href = "index.html";
  }

  function addHistory(text){
    let li = document.createElement("li");
    li.innerText = text;
    document.getElementById("history").appendChild(li);
  }
}
