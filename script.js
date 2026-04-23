<script>
let balance = 1000;
let btcOwned = 0;
let lastBuyPrice = 0;

async function getBTCPrice() {
  let res = await fetch("https://api.coindesk.com/v1/bpi/currentprice/BTC.json");
  let data = await res.json();
  let price = data.bpi.USD.rate_float;

  document.getElementById("price").innerText = price.toFixed(2);
  return price;
}

async function buyBTC() {
  let price = await getBTCPrice();

  if (balance <= 0) {
    alert("No balance to buy!");
    return;
  }

  btcOwned = balance / price;
  lastBuyPrice = price;
  balance = 0;

  updateUI();
  addHistory(`🟢 Bought BTC at $${price.toFixed(2)}`);
}

async function sellBTC() {
  let price = await getBTCPrice();

  if (btcOwned <= 0) {
    alert("No BTC to sell!");
    return;
  }

  let newBalance = btcOwned * price;
  let profit = newBalance - (btcOwned * lastBuyPrice);

  balance = newBalance;
  btcOwned = 0;

  updateUI();
  addHistory(`🔴 Sold BTC at $${price.toFixed(2)} | P/L: $${profit.toFixed(2)}`);
}

function updateUI() {
  document.getElementById("balance").innerText = balance.toFixed(2);
}

function addHistory(text) {
  let history = document.getElementById("history");
  let item = document.createElement("p");
  item.innerText = text;
  history.prepend(item);
}

// auto update price every 5 seconds
setInterval(getBTCPrice, 5000);
getBTCPrice();
</script>
