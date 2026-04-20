// ================= STATE =================
let state = JSON.parse(localStorage.getItem("wallet")) || {
  usd: 1000,
  btc: 0,
  eth: 0,
  btcPrice: 76000,
  ethPrice: 2300,
  history: []
};

const START = 1000;

// ================= INIT =================
document.getElementById("user").innerText = "DemoUser";

// ================= CHART =================
function loadChart(){
  new TradingView.widget({
    container_id: "chartContainer",
    symbol: "BINANCE:BTCUSDT",
    interval: "1",
    theme: "dark",
    style: "1",
    locale: "en",
    hide_side_toolbar: true,
    allow_symbol_change: false,
    width: "100%",
    height: 350
  });
}

// ================= SAVE =================
function save(){
  localStorage.setItem("wallet", JSON.stringify(state));
}

// ================= PRICE SIMULATION =================
function updatePrices(){
  state.btcPrice += (Math.random()-0.5)*250;
  state.ethPrice += (Math.random()-0.5)*15;

  document.getElementById("btc").innerText = state.btcPrice.toFixed(2);
  document.getElementById("eth").innerText = state.ethPrice.toFixed(2);

  document.getElementById("lastUpdate").innerText =
    "Last Update: " + new Date().toLocaleTimeString();
}

// ================= BUY =================
function buy(){
  let amt = parseFloat(document.getElementById("amount").value);
  if(!amt) return;

  if(amt > state.usd) return alert("Not enough USD");

  let btc = amt / state.btcPrice;

  state.usd -= amt;
  state.btc += btc;

  state.history.unshift(`BUY $${amt} BTC @ ${state.btcPrice.toFixed(2)}`);

  save();
  render();
}

// ================= SELL =================
function sell(){
  let amt = parseFloat(document.getElementById("amount").value);
  if(!amt) return;

  let btc = amt / state.btcPrice;

  if(btc > state.btc) return alert("Not enough BTC");

  state.usd += amt;
  state.btc -= btc;

  state.history.unshift(`SELL $${amt} BTC @ ${state.btcPrice.toFixed(2)}`);

  save();
  render();
}

// ================= CALC =================
function total(){
  return state.usd + (state.btc * state.btcPrice);
}

function pl(){
  let diff = total() - START;
  let pct = (diff/START)*100;
  return `${diff.toFixed(2)} (${pct.toFixed(2)}%)`;
}

// ================= RENDER =================
function render(){

  document.getElementById("balance").innerText = state.usd.toFixed(2);

  document.getElementById("usd").innerText = state.usd.toFixed(2);
  document.getElementById("btc_hold").innerText = state.btc.toFixed(6);
  document.getElementById("eth_hold").innerText = state.eth.toFixed(6);

  document.getElementById("total").innerText = total().toFixed(2);
  document.getElementById("pl").innerText = "P/L: $" + pl();

  let h = document.getElementById("history");
  h.innerHTML = "";

  state.history.slice(0,10).forEach(t=>{
    let li = document.createElement("li");
    li.innerText = t;
    h.appendChild(li);
  });

  save();
}

// ================= LOOP =================
setInterval(()=>{
  updatePrices();
  render();
}, 2000);

// ================= START =================
loadChart();
render();
updatePrices();
