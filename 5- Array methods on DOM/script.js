const addUserBtn = document.getElementById("add-user");
const doubleMoneyBtn = document.getElementById("double-money");
const ShowMilBtn = document.getElementById("show-only-mil");
const sortBtn = document.getElementById("sort-by-rich");
const calcWealthBtn = document.getElementById("calculate-wealth");
const personList = document.querySelector(".result-list");
const totalWealth = document.querySelector(".total-result");

let traceTotalWealth = 0;

const api = "https://randomuser.me/api";

function getTotalWealth() {
  if (totalWealth.classList.contains("hidden"))
    totalWealth.classList.toggle("hidden");
  totalWealth.querySelector(".total-result-sum").innerHTML =
    convertToCurrency(traceTotalWealth);
}

function convertToCurrency(num) {
  const options = { style: "currency", currency: "USD" };
  const salary = num.toLocaleString("en-US", options);
  return salary;
}

function convertToNumber(currency) {
  return Number(currency.replace(/[^0-9.-]+/g, ""));
}

async function getPerson() {
  const response = await fetch(api);
  const data = await response.json();
  const person = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    salary: Math.floor(Math.random() * 1000000),
  };
  return person;
}

async function addUser() {
  const el = document.createElement("li");
  const person = await getPerson();

  el.innerHTML = `
    <p class="person-name">${person.name}</p>
    <p class="salary">${convertToCurrency(person.salary)}</p>
  `;
  traceTotalWealth += person.salary;
  if (!totalWealth.classList.contains("hidden")) getTotalWealth();
  personList.append(el);
}

function renderList(list) {
  personList.innerHTML = ``;
  for (const i of list) {
    personList.append(i);
  }
}

function doubleMoney() {
  traceTotalWealth = 0;
  const arr = [...document.querySelectorAll(".result-list li")];
  arr.forEach((element) => {
    const salary = element.querySelector(".salary");
    const number = 2 * convertToNumber(salary.innerText);
    traceTotalWealth += number;
    salary.innerHTML = convertToCurrency(number);
  });
  if (!totalWealth.classList.contains("hidden")) getTotalWealth();
}

function getOnlyMil() {
  traceTotalWealth = 0;
  const arr = [...document.querySelectorAll(".result-list li")];
  const filterd = arr.filter((item) => {
    const salary = item.querySelector(".salary").innerText;
    if (convertToNumber(salary) >= 1000000) {
      traceTotalWealth += convertToNumber(salary);
      return true;
    }
    return false;
  });
  console.log();
  if (!totalWealth.classList.contains("hidden")) getTotalWealth();
  renderList(filterd);
}

function sortByRich() {
  const arr = [...document.querySelectorAll(".result-list li")];
  const result = arr.sort((item1, item2) => {
    const sal1 = item1.querySelector(".salary").innerText;
    const sal2 = item2.querySelector(".salary").innerText;
    return convertToNumber(sal2) - convertToNumber(sal1);
  });
  renderList(result);
}

addUserBtn.addEventListener("click", addUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
ShowMilBtn.addEventListener("click", getOnlyMil);
sortBtn.addEventListener("click", sortByRich);
calcWealthBtn.addEventListener("click", getTotalWealth);
