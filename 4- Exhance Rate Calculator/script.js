const inputAmount1 = document.getElementById("currency-amount-1");
const inputCurrency1 = document.getElementById("currency-1");
const inputAmount2 = document.getElementById("currency-amount-2");
const inputCurrency2 = document.getElementById("currency-2");
const swapBtn = document.getElementById("swap-rate-btn");
const rateText = document.querySelector(".swap-rate-container p");

async function getExchangeRate(from, to) {
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from}`;
  const response = await fetch(apiUrl);
  const rate = await response.json();
  console.log(rate);
  return rate.rates[to];
}

async function updateData() {
  const from = inputCurrency1.value;
  const to = inputCurrency2.value;
  const rate = await getExchangeRate(from, to);
  const result = rate * inputAmount1.value;
  inputAmount2.value = result.toFixed(2);
  rateText.innerText = `1 ${from} = ${rate} ${to}`;
  console.log(rate);
}

function sawpCurrency() {
  [inputCurrency1.value, inputCurrency2.value] = [
    inputCurrency2.value,
    inputCurrency1.value,
  ];
  updateData();
}

inputAmount1.addEventListener("input", updateData);
inputAmount2.addEventListener("input", updateData);
inputCurrency1.addEventListener("change", updateData);
inputCurrency2.addEventListener("change", updateData);
swapBtn.addEventListener("click", sawpCurrency);

updateData();
