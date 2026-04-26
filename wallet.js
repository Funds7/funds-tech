function deposit() {
let amount = parseFloat(prompt("Enter deposit amount:"));

if (isNaN(amount) || amount <= 0) return alert("Invalid amount");

balance += amount;

addHistory({
type: "SYSTEM",
side: "DEPOSIT",
amount: 0,
price: 0,
value: amount,
profit: 0
});

saveData();
}

function withdraw() {
let amount = parseFloat(prompt("Enter withdraw amount:"));

if (isNaN(amount) || amount <= 0) return alert("Invalid amount");
if (amount > balance) return alert("Not enough balance");

balance -= amount;

addHistory({
type: "SYSTEM",
side: "WITHDRAW",
amount: 0,
price: 0,
value: amount,
profit: 0
});

saveData();
}

function transfer() {
let amount = parseFloat(prompt("Enter transfer amount:"));
let user = prompt("Enter receiver name:");

if (isNaN(amount) || amount <= 0) return alert("Invalid amount");
if (!user) return alert("Enter receiver name");
if (amount > balance) return alert("Not enough balance");

balance -= amount;

addHistory({
type: "SYSTEM",
side: "TRANSFER",
amount: 0,
price: 0,
value: amount,
profit: 0,
to: user
});

saveData();
}
// ================= SAVE =================
function saveData() {
localStorage.setItem("balance", balance);
localStorage.setItem("history", JSON.stringify(historyData));
localStorage.setItem("position", JSON.stringify(position));
updateUI();
}
