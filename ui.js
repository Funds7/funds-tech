// ================= UI =================
function updateUI() {
let bal = document.getElementById("balance");
if (bal) bal.innerText = balance.toFixed(2);

let btcEl = document.getElementById("btc");
if (btcEl) btcEl.innerText = position.size.toFixed(6);

let hist = document.getElementById("history");
if (hist) {
hist.innerHTML = "";

historyData.forEach(h => {  
  let p = document.createElement("p");  

  if (typeof h === "object") {  
    let color = "white";  

    if (h.side === "BUY") color = "lime";  
    else if (h.side === "SELL") color = "red";  
    else if (h.side === "DEPOSIT") color = "cyan";  
    else if (h.side === "WITHDRAW") color = "orange";  
    else if (h.side === "TRANSFER") color = "purple";  

    p.innerHTML = `  
      <span style="color:${color}">${h.side}</span>  
      ${h.amount ? h.amount.toFixed(6) + " BTC" : ""}  
      ${h.price ? "@ $" + h.price.toFixed(2) : ""}  
      | $${h.value?.toFixed(2)}  
      ${h.profit ? "| P/L: " + h.profit.toFixed(2) : ""}  
    `;  
  } else {  
    p.innerText = h;  
  }  

  hist.appendChild(p);  
});

}
}

// ================= PROFIT =================
function updateProfitDashboard(price) {
if (!price || position.size === 0) {
let el = document.getElementById("profit");
if (el) el.innerText = "0.00";
document.getElementById("profitPercent").innerText = "0%";
document.getElementById("totalValue").innerText = balance.toFixed(2);
return;
}

let entry = position.avgPrice;

let change = ((price - entry) / entry) * 100;

let positionValue = position.size * price;
let entryValue = position.size * entry;

let unrealizedPL = positionValue - entryValue;

document.getElementById("profit").innerText =
(Math.round(unrealizedPL * 100) / 100).toFixed(2);

document.getElementById("profitPercent").innerText =
change.toFixed(2) + "%";

document.getElementById("totalValue").innerText =
(balance + positionValue).toFixed(2);
}
