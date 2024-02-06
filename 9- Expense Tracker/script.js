const inputText = document.getElementById("text");
const inputNumber = document.getElementById("amount");
const addTransactionBtn = document.getElementById("add-transaction-btn");
const historyList = document.querySelector(".hisotry-list");

const incomeText = document.querySelector(".income-cash");
const expenseText = document.querySelector(".expense-cash");
const totalBalance = document.querySelector(".price");

const historyItems = [];

let dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let income = 0;
let expense = 0;

function displayFromLocalStorage() {
  income = +localStorage.getItem("income");
  expense = +localStorage.getItem("expense");
  const arr = localStorage.getItem("historyItems").split(",");
  for (let i = 0; i < arr.length; i += 2) {
    const el = createHistoryItem(arr[i], +arr[i + 1]);
    historyList.append(el);
  }
  updateUI();
}

function createHistoryItem(text, amount) {
  const newItem = document.createElement("li");
  if (amount >= 0) newItem.className = "hisotry-item pos";
  else newItem.className = "hisotry-item neg";
  newItem.innerHTML = `
    <button class="delete-history-item">
      <i class="fa-solid fa-trash"></i>
    </button>
    <p class="name">${text}</p>
    <p class="value">${amount > 0 ? `+` : ""}${dollarUS.format(amount)}</p>`;
  const btn = newItem.querySelector("button");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (+amount > 0) income -= +amount;
    else if (+amount < 0) expense -= +amount;
    updateUI();
    newItem.remove();
  });
  return newItem;
}

displayFromLocalStorage();

function updateUI() {
  incomeText.innerText = dollarUS.format(income);
  expenseText.innerText = dollarUS.format(expense < 0 ? -1 * expense : 0);
  console.log(income);
  console.log(expense);
  totalBalance.innerText = dollarUS.format(income + expense);
}

function inputValidality(text, amount) {
  let validInput = true;
  if (!text.trim()) {
    if (!inputText.parentElement.classList.contains("wrong"))
      inputText.parentElement.classList.add("wrong");
    validInput = false;
  }
  if (!amount.trim()) {
    if (!inputNumber.parentElement.classList.contains("wrong"))
      inputNumber.parentElement.classList.add("wrong");
    validInput = false;
  }
  return validInput;
}
function saveToLocalStorage(text, amount) {
  localStorage.setItem("income", `${income}`);
  localStorage.setItem("expense", `${expense}`);
  localStorage.setItem("historyItems", historyItems.toString());
}

function addNewHistoryItem() {
  const text = inputText.value;
  const amount = inputNumber.value;
  // If there's a past wrong input return it to normal state
  if (inputText.parentElement.classList.contains("wrong"))
    inputText.parentElement.classList.remove("wrong");
  if (inputNumber.parentElement.classList.contains("wrong"))
    inputNumber.parentElement.classList.remove("wrong");
  // check for current Input validality
  if (!inputValidality(text, amount)) return;
  const newItem = createHistoryItem(text, amount);
  if (amount >= 0) income += +amount;
  else expense += +amount;
  inputText.value = "";
  inputNumber.value = "";
  historyList.append(newItem);
  historyItems.push(text, amount);
  updateUI();
}

addTransactionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addNewHistoryItem();
});
