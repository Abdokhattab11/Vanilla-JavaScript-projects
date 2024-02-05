import Meal from "./meal.js";

const input = document.getElementById("meal-input");
const seachBtn = document.getElementById("search-btn");
const suffleBtn = document.getElementById("suffle-btn");

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const mealsByNameUrl = "www.themealdb.com/api/json/v1/1/search.php?s="; // name

async function getRandomMeal() {
  const response = await fetch(randomMealUrl);
  const data = await response.json();
  console.log(data["meals"][0]);
  const meal = new Meal(data["meals"][0]);
  console.log(meal);
}
async function getMeals() {}

getRandomMeal();
