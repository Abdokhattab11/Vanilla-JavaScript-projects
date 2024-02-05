import Meal from "./meal.js";

const input = document.getElementById("meal-input");
const seachBtn = document.getElementById("search-btn");
const suffleBtn = document.getElementById("suffle-btn");
const mealAllInfo = document.querySelector(".specific-meal-info");
const mealsSection = document.querySelector(".meals-section");

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const mealsByNameUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="; // name

function getMealData(mealJson, idx = 0) {
  return mealJson["meals"][idx];
}

function displayAllMealInfo(meal) {
  if (mealAllInfo.classList.contains("hidden"))
    mealAllInfo.classList.remove("hidden");
  mealAllInfo.innerHTML = meal.rederAllInfo();
}

async function getRandomMeal() {
  const response = await fetch(randomMealUrl);
  const data = await response.json();
  const meal = new Meal(getMealData(data));
  if (mealAllInfo.classList.contains("hidden"))
    mealAllInfo.classList.remove("hidden");
  mealAllInfo.innerHTML = meal.rederAllInfo();
  console.log(meal);
}

async function getMealsByName(name) {
  if (mealsSection.classList.contains("hidden"))
    mealsSection.classList.remove("hidden");
  if (!mealAllInfo.classList.contains("hidden"))
    mealAllInfo.classList.add("hidden");
  const mealsList = mealsSection.querySelector("ul");
  const mealsTitle = mealsSection.querySelector("h3");
  const url = `${mealsByNameUrl}${name}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    mealsList.innerHTML = ``;
    mealsTitle.innerText = ``;
    for (let i = 0; i < data["meals"].length; i++) {
      const meal = new Meal(getMealData(data, i));
      const mealDom = document.createElement("li");
      mealDom.className = "meal-item";
      mealDom.innerHTML = meal.renderGallary();
      mealsList.append(mealDom);
      mealDom.addEventListener("click", displayAllMealInfo.bind(null, meal));
    }
  } catch (e) {
    mealsTitle.innerText = `Can't Find Meals With Name ${name}`;
    return;
  }
}

suffleBtn.addEventListener("click", (e) => {
  // To prevent page from reloading
  // Each Time we click on suffle
  if (!mealsSection.classList.contains("hidden"))
    mealsSection.classList.add("hidden");
  e.preventDefault();
  getRandomMeal();
});
seachBtn.addEventListener("click", (e) => {
  // To prevent page from reloading
  // Each Time we click on Search
  e.preventDefault();
  const mealName = input.value;
  getMealsByName(mealName);
});
